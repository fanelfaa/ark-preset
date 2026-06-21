import { createForm } from "@tanstack/solid-form";
import { createListCollection } from "@ark-ui/solid";
import { Index, Show } from "solid-js";
import { parseDate } from "@internationalized/date";

import { Input } from "@ark-preset/solid";
import { Button } from "@ark-preset/solid";
import { Textarea } from "@ark-preset/solid";
import { NumberInput } from "@ark-preset/solid";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "@ark-preset/solid";
import { Checkbox, CheckboxLabel } from "@ark-preset/solid";
import { Switch, SwitchLabel } from "@ark-preset/solid";

import { Slider, SliderLabel, SliderControl, SliderThumb } from "@ark-preset/solid";
import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";
import { Combobox, ComboboxLabel, ComboboxInputTrigger, ComboboxContent, ComboboxItem } from "@ark-preset/solid";
import { TagsInput } from "@ark-preset/solid";
import { RadioGroup, RadioGroupItem } from "@ark-preset/solid";
import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";
import { Toggle, ToggleIndicator } from "@ark-preset/solid";
import { ToggleGroup, ToggleGroupItem } from "@ark-preset/solid";
import { PasswordInputBase } from "@ark-preset/solid";
import { DatePicker } from "@ark-preset/solid";

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
  ],
});

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
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="flex flex-col gap-5"
    >
      {/* ── Name ── */}
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            value.length < 2 ? "Name must be at least 2 characters" : undefined,
        }}
        children={(field) => (
          <Input
            name={field().name}
            value={field().state.value}
            label="Name"
            placeholder="Enter your name"
            error={field().state.meta.errors[0]}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Email ── */}
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Email is required";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
            return undefined;
          },
        }}
        children={(field) => (
          <Input
            name={field().name}
            value={field().state.value}
            label="Email"
            placeholder="email@example.com"
            error={field().state.meta.errors[0]}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Age ── */}
      <form.Field
        name="age"
        validators={{
          onChange: ({ value }) => {
            if (value < 13) return "Must be at least 13 years old";
            return undefined;
          },
        }}
        children={(field) => (
          <NumberInput
            name={field().name}
            label="Age"
            value={String(field().state.value)}
            error={!!field().state.meta.errors[0]}
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
        validators={{
          onChange: ({ value }) => {
            if (value.length > 0 && value.length < 6) return "Password must be at least 6 characters";
            return undefined;
          },
          onBlur: ({ value }) => {
            if (value.length > 0 && value.length < 6) return "Password must be at least 6 characters";
            return undefined;
          },
        }}
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <PasswordInputBase.Root invalid={!!field().state.meta.isTouched && !!field().state.meta.errors[0]}>
              <PasswordInputBase.Label>Password</PasswordInputBase.Label>
              <PasswordInputBase.Control>
                <PasswordInputBase.Field
                  value={field().state.value}
                  onInput={(e) => field().handleChange(e.currentTarget.value)}
                  onBlur={field().handleBlur}
                  placeholder="Enter password"
                />
                <PasswordInputBase.VisibilityTrigger>
                  <PasswordInputBase.Indicator
                    fallback={
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </PasswordInputBase.Indicator>
                </PasswordInputBase.VisibilityTrigger>
              </PasswordInputBase.Control>
            </PasswordInputBase.Root>
            <Show when={field().state.meta.errors[0]}>
              {(msg) => <div class="text-destructive text-sm">{msg()}</div>}
            </Show>
          </div>
        )}
      />

      {/* ── Role ── */}
      <form.Field
        name="role"
        validators={{
          onBlur: ({ value }) => (!value ? "Please select a role" : undefined),
        }}
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Select
              name={field().name}
              collection={roles}
              value={field().state.value ? [field().state.value] : []}
              error={!!field().state.meta.errors[0]}
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
            <Show when={field().state.meta.errors[0]}>
              {(msg) => <div class="text-destructive text-sm">{msg()}</div>}
            </Show>
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
        )}
      />

      {/* ── Priority (SegmentGroup) ── */}
      <form.Field
        name="priority"
        children={(field) => (
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
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Start date is required";
            return undefined;
          },
        }}
        children={(field) => (
          <DatePicker
            name={field().name}
            label="Start Date"
            placeholder="Pick a date"
            value={[parseDate(field().state.value)]}
            onValueChange={(e) => field().handleChange(String(e.value[0]))}
          />
        )}
      />

      {/* ── Bio ── */}
      <form.Field
        name="bio"
        validators={{
          onChange: ({ value }) =>
            value.length > 200 ? "Bio must be under 200 characters" : undefined,
        }}
        children={(field) => (
          <Textarea
            name={field().name}
            value={field().state.value}
            label="Bio"
            placeholder="Tell us about yourself"
            error={field().state.meta.errors[0]}
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      {/* ── Skills (TagsInput) ── */}
      <form.Field
        name="skills"
        validators={{
          onBlur: ({ value }) => {
            if (value.length > 10) return "Maximum 10 skills allowed";
            return undefined;
          },
        }}
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
            <ToggleIndicator>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              </svg>
            </ToggleIndicator>
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
        validators={{
          onBlur: ({ value }) => (!value ? "You must accept the terms" : undefined),
        }}
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Checkbox
              name={field().name}
              checked={field().state.value}
              invalid={!!field().state.meta.errors[0]}
              onCheckedChange={(e) => field().handleChange(!!e.checked)}
              onBlur={field().handleBlur}
            >
              <CheckboxLabel>I accept the terms and conditions</CheckboxLabel>
            </Checkbox>
            <Show when={field().state.meta.errors[0]}>
              {(msg) => <div class="text-destructive text-sm">{msg()}</div>}
            </Show>
          </div>
        )}
      />

      {/* ── Submit ── */}
      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
        children={(state) => (
          <Button type="submit" disabled={!state().canSubmit}>
            {state().isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      />
    </form>
  );
}
