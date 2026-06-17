import { TagsInput } from "@ark-preset/solid";

export default function TagsInputDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Disabled tags input</p>
        <TagsInput defaultValue={["React", "Solid"]} label="Frameworks" disabled />
      </div>
    </div>
  );
}
