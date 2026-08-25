import { createSignal } from "solid-js";
import { TagsInput } from "@ark-preset/solid";

export default function TagsInputControlledDemo() {
  const [value, setValue] = createSignal(["Solid"]);
  return (
    <div class="space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Tags: {value().join(", ")}</p>
        <TagsInput value={value()} onValueChange={(e) => setValue(e.value)} label="Frameworks" />
      </div>
    </div>
  );
}
