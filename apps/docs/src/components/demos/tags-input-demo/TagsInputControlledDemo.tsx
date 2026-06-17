import { createSignal } from "solid-js";
import { TagsInput } from "@fan-ui/solid";

export default function TagsInputControlledDemo() {
  const [value, setValue] = createSignal(["Solid"]);
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Tags: {value().join(", ")}</p>
        <TagsInput value={value()} onValueChange={(e) => setValue(e.value)} label="Frameworks" />
      </div>
    </div>
  );
}
