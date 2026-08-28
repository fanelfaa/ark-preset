import { createForm } from "@tanstack/solid-form";
import { createListCollection } from "@ark-ui/solid";
import { Index, Show } from "solid-js";
import { parseDate } from "@internationalized/date";
import { z } from "zod";

import {
  Input,
  Button,
  Textarea,
  NumberInput,
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Checkbox,
  CheckboxLabel,
  Switch,
  SwitchLabel,
  Slider,
  SliderLabel,
  SliderControl,
  SliderThumb,
  RatingGroup,
  RatingGroupLabel,
  Combobox,
  ComboboxLabel,
  ComboboxInputTrigger,
  ComboboxContent,
  ComboboxItem,
  TagsInput,
  RadioGroup,
  RadioGroupItem,
  SegmentGroup,
  SegmentGroupItem,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  PasswordInput,
  DatePicker,
} from "@ark-preset/solid";
import { labelVariants } from "@ark-preset/core";

// ── Zod schema ──

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  age: z.number().min(13, "Must be at least 13 years old"),
  role: z.string().min(1, "Please select a role"),
  country: z.string(),
  bio: z.string().max(200, "Bio must be under 200 characters"),
  plan: z.string(),
  rating: z.number(),
  priority: z.string(),
  volume: z.number(),
  notifications: z.boolean(),
  skills: z.array(z.string()).max(10, "Maximum 10 skills allowed"),
  password: z
    .string()
    .refine((v) => v.length === 0 || v.length >= 6, "Password must be at least 6 characters"),
  accepted: z.boolean().refine((v) => v, { message: "You must accept the terms" }),
  startDate: z.string().min(1, "Start date is required"),
  bold: z.boolean(),
  alignment: z.string(),
});

// ── Field helpers ──

function fieldError(field: any): string | undefined {
  const err = field.state.meta.errors[0];
  if (!err) return undefined;
  if (typeof err === "string") return err;
  return (err as { message?: string }).message;
}

function FieldHint(props: { field: any }) {
  return (
    <Show when={fieldError(props.field)}>
      {(msg) => <div class="text-destructive text-sm">{msg()}</div>}
    </Show>
  );
}

// ── Data ──

const countries = createListCollection({
  items: [
    { label: "Indonesia", value: "id" },
    { label: "Malaysia", value: "my" },
    { label: "Singapore", value: "sg" },
    { label: "Thailand", value: "th" },
    { label: "Vietnam", value: "vn" },
    { label: "Japan", value: "jp" },
    { label: "South Korea", value: "kr" },
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "gb" },
    { label: "Australia", value: "au" },
  ],
});

const roles = createListCollection({
  items: [
    { label: "Developer", value: "developer" },
    { label: "Designer", value: "designer" },
    { label: "Product Manager", value: "pm" },
    { label: "QA Engineer", value: "qa" },
    { label: "Data Analyst", value: "analyst" },
    { label: "DevOps Engineer", value: "devops" },
    { label: "Tech Lead", value: "tech-lead" },
    { label: "Engineering Manager", value: "eng-manager" },
    { label: "CTO", value: "cto" },
    { label: "VP of Engineering", value: "vp-eng" },
  ],
});

// ── Component ──

export default function TanstackFormDemo() {
  const form = createForm(() => ({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      role: "",
      country: "",
      bio: "",
      plan: "free",
      rating: 0,
      priority: "medium",
      volume: 50,
      notifications: false,
      skills: [] as string[],
      password: "",
      accepted: false,
      startDate: "2026-06-01",
      bold: false,
      alignment: "left",
    },
    validators: {
      onBlur: formSchema,
      onSubmit: (values: unknown) => {
        console.log("[dbg] onSubmit validator called");
        const r = formSchema.safeParse(values);
        console.log("[dbg] onSubmit validator success =", r.success);
        return r.success ? undefined : r.error;
      },
    },
    onSubmit: async ({ value }) => {
      console.log("[dbg] form onSubmit called, accepted =", value.accepted);
      alert(JSON.stringify(value, null, 2));
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        console.log("[dbg] native submit event");
        e.preventDefault();
        e.stopPropagation();
        try {
          const r = form.handleSubmit() as any;
          if (r && typeof r.catch === "function") {
            r.catch((err: unknown) => console.log("[dbg] handleSubmit rejected", err));
          }
        } catch (err) {
          console.log("[dbg] handleSubmit threw", err);
        }
      }}
      class="flex flex-col gap-5"
    >
      {/* ── Name ── */}
      <form.Field
        name="name"
        children={(field) => (
          <Input
            name={field().name}
            value={field().state.value}
            label="Name"
            placeholder="Enter your name"
            error={fieldError(field())}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Email ── */}
      <form.Field
        name="email"
        children={(field) => (
          <Input
            name={field().name}
            value={field().state.value}
            label="Email"
            placeholder="email@example.com"
            error={fieldError(field())}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Age ── */}
      <form.Field
        name="age"
        children={(field) => (
          <NumberInput
            name={field().name}
            label="Age"
            value={String(field().state.value)}
            error={!!fieldError(field())}
            min={0}
            max={150}
            onValueChange={(e) => field().handleChange(e.valueAsNumber)}
            onBlur={field().handleBlur}
          />
        )}
      />

      {/* ── Password ── */}
      <form.Field
        name="password"
        children={(field) => (
          <PasswordInput
            name={field().name}
            value={field().state.value}
            label="Password"
            placeholder="Enter password"
            error={!!fieldError(field())}
            onInput={(e: InputEvent) => field().handleChange((e.target as HTMLInputElement).value)}
            onBlur={field().handleBlur}
          />
        )}
      />

      {/* ── Role ── */}
      <form.Field
        name="role"
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Select
              name={field().name}
              collection={roles}
              value={field().state.value ? [field().state.value] : []}
              error={!!fieldError(field())}
              onValueChange={(e) => {
                field().handleChange(e.value[0]);
                field().handleBlur();
              }}
              onOpenChange={(details) => {
                if (!details.open) field().handleBlur();
              }}
            >
              <SelectLabel>Role</SelectLabel>
              <SelectTrigger placeholder="Select a role" />
              <SelectContent>
                <Index each={roles.items}>
                  {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
                </Index>
              </SelectContent>
            </Select>
            <FieldHint field={field()} />
          </div>
        )}
      />

      {/* ── Country (Combobox) ── */}
      <form.Field
        name="country"
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Combobox
              name={field().name}
              collection={countries}
              value={field().state.value ? [field().state.value] : []}
              onValueChange={(e) => field().handleChange(e.value[0])}
              onOpenChange={(details) => {
                if (!details.open) field().handleBlur();
              }}
            >
              <ComboboxLabel>Country</ComboboxLabel>
              <ComboboxInputTrigger placeholder="Search country..." />
              <ComboboxContent>
                <Index each={countries.items}>
                  {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
                </Index>
              </ComboboxContent>
            </Combobox>
          </div>
        )}
      />

      {/* ── Plan (RadioGroup) ── */}
      <form.Field
        name="plan"
        children={(field) => (
          <fieldset>
            <div class="not-prose flex flex-col gap-2">
              <legend class={labelVariants()}>Plan</legend>
              <RadioGroup
                name={field().name}
                value={field().state.value}
                onValueChange={(e) => field().handleChange(e.value ?? "")}
                onBlur={field().handleBlur}
              >
                <RadioGroupItem value="free">Free</RadioGroupItem>
                <RadioGroupItem value="pro">Pro</RadioGroupItem>
                <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
              </RadioGroup>
            </div>
          </fieldset>
        )}
      />

      {/* ── Priority (SegmentGroup) ── */}
      <form.Field
        name="priority"
        children={(field) => (
          <fieldset>
            <div class="not-prose flex flex-col gap-2">
              <legend class={labelVariants()}>Priority</legend>
              <SegmentGroup
                name={field().name}
                value={field().state.value}
                onValueChange={(e) => field().handleChange(e.value ?? "")}
                onBlur={field().handleBlur}
              >
                <SegmentGroupItem value="low">Low</SegmentGroupItem>
                <SegmentGroupItem value="medium">Medium</SegmentGroupItem>
                <SegmentGroupItem value="high">High</SegmentGroupItem>
              </SegmentGroup>
            </div>
          </fieldset>
        )}
      />

      {/* ── Rating ── */}
      <form.Field
        name="rating"
        children={(field) => (
          <RatingGroup
            name={field().name}
            value={field().state.value}
            count={5}
            orientation="vertical"
            onValueChange={(e) => field().handleChange(e.value)}
            onBlur={field().handleBlur}
          >
            <RatingGroupLabel>Rating</RatingGroupLabel>
          </RatingGroup>
        )}
      />

      {/* ── Volume (Slider) ── */}
      <form.Field
        name="volume"
        children={(field) => (
          <Slider
            name={field().name}
            value={[field().state.value]}
            min={0}
            max={100}
            step={1}
            onValueChange={(e) => field().handleChange(e.value[0])}
            onBlur={field().handleBlur}
          >
            <SliderLabel>Volume: {field().state.value}%</SliderLabel>
            <SliderControl>
              <SliderThumb index={0} />
            </SliderControl>
          </Slider>
        )}
      />

      {/* ── Start Date (DatePicker) ── */}
      <form.Field
        name="startDate"
        children={(field) => (
          <DatePicker
            name={field().name}
            label="Start Date"
            placeholder="Pick a date"
            value={field().state.value ? [parseDate(field().state.value)] : []}
            error={!!fieldError(field())}
            onValueChange={(e) => field().handleChange(e.value[0] ? String(e.value[0]) : "")}
          />
        )}
      />

      {/* ── Bio ── */}
      <form.Field
        name="bio"
        children={(field) => (
          <Textarea
            name={field().name}
            value={field().state.value}
            label="Bio"
            placeholder="Tell us about yourself"
            error={fieldError(field())}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Skills (TagsInput) ── */}
      <form.Field
        name="skills"
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <TagsInput
              name={field().name}
              value={field().state.value}
              label="Skills"
              placeholder="Type skill and press Enter"
              onValueChange={(e) => field().handleChange(e.value)}
            />
          </div>
        )}
      />

      {/* ── Notifications (Switch) ── */}
      <form.Field
        name="notifications"
        children={(field) => (
          <Switch
            name={field().name}
            checked={field().state.value}
            onCheckedChange={(e) => field().handleChange(!!e.checked)}
            onBlur={field().handleBlur}
          >
            <SwitchLabel>Enable email notifications</SwitchLabel>
          </Switch>
        )}
      />

      {/* ── Bold (Toggle) ── */}
      <form.Field
        name="bold"
        children={(field) => (
          <Toggle
            name={field().name}
            pressed={field().state.value}
            onPressedChange={(pressed) => field().handleChange(!!pressed)}
            onBlur={field().handleBlur}
          >
            Bold
          </Toggle>
        )}
      />

      {/* ── Alignment (ToggleGroup) ── */}
      <form.Field
        name="alignment"
        children={(field) => (
          <ToggleGroup
            value={[field().state.value]}
            onValueChange={(e) => field().handleChange(e.value[0])}
            onBlur={field().handleBlur}
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        )}
      />

      {/* ── Accepted (Checkbox) ── */}
      <form.Field
        name="accepted"
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Checkbox
              name={field().name}
              checked={field().state.value}
              invalid={!!fieldError(field())}
              onCheckedChange={(e) => {
                field().handleChange(!!e.checked);
              }}
              onBlur={field().handleBlur}
            >
              <CheckboxLabel>I accept the terms and conditions</CheckboxLabel>
            </Checkbox>
            <FieldHint field={field()} />
          </div>
        )}
      />

      {/* ── Submit ── */}
      <form.Subscribe
        selector={(state) => ({
          isSubmitting: state.isSubmitting,
        })}
        children={(state) => (
          <Button type="submit" disabled={state().isSubmitting}>
            {state().isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      />

      {/* DEBUG: live form values (temporary) */}
      <form.Subscribe
        selector={(s) => s.values}
        children={(v) => <pre class="text-xs opacity-50">{JSON.stringify(v())}</pre>}
      />
    </form>
  );
}
