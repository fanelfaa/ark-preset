import { createForm } from "@tanstack/solid-form";
import { createListCollection } from "@ark-ui/solid";
import { Index, Show } from "solid-js";
import { Input } from "@ark-preset/solid";
import { Button } from "@ark-preset/solid";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "@ark-preset/solid";
import { Checkbox, CheckboxLabel } from "@ark-preset/solid";

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
      role: "",
      accepted: false,
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
      class="flex flex-col gap-4"
    >
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
            error={
              field().state.meta.isTouched && field().state.meta.errors[0]
                ? field().state.meta.errors[0]
                : undefined
            }
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

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
            error={
              field().state.meta.isTouched && field().state.meta.errors[0]
                ? field().state.meta.errors[0]
                : undefined
            }
            onBlur={field().handleBlur}
            onInput={(e) => field().handleChange(e.currentTarget.value)}
          />
        )}
      />

      <form.Field
        name="role"
        validators={{
          onChange: ({ value }) => (!value ? "Please select a role" : undefined),
          onBlur: ({ value }) => (!value ? "Please select a role" : undefined),
        }}
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Select
              name={field().name}
              collection={roles}
              value={field().state.value ? [field().state.value] : []}
              error={field().state.meta.isTouched && !!field().state.meta.errors[0]}
              onValueChange={(e) => {
                field().handleChange(e.value[0]);
                field().handleBlur();
              }}
              onOpenChange={(details) => {
                if (!details.open) field().handleBlur();
              }}
              onInteractOutside={() => field().handleBlur()}
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

      <form.Field
        name="accepted"
        validators={{
          onChange: ({ value }) => (!value ? "You must accept the terms" : undefined),
          onBlur: ({ value }) => (!value ? "You must accept the terms" : undefined),
        }}
        children={(field) => (
          <div class="not-prose flex flex-col gap-1">
            <Checkbox
              name={field().name}
              checked={field().state.value}
              invalid={field().state.meta.isTouched && !!field().state.meta.errors[0]}
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
