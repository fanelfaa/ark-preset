import { TagsInput } from "@fan-ui/solid";

export default function TagsInputInvalidDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Invalid tags input</p>
        <TagsInput defaultValue={["React", "Solid"]} label="Frameworks" invalid />
      </div>
    </div>
  );
}
