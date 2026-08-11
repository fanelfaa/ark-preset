import { TagsInput } from "@ark-preset/solid";

export default function TagsInputInvalidDemo() {
  return (
    <div class="space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Invalid tags input</p>
        <TagsInput defaultValue={["React", "Solid"]} label="Frameworks" invalid />
      </div>
    </div>
  );
}
