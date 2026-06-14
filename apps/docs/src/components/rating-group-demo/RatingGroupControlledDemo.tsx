import { createSignal } from "solid-js";
import { RatingGroup } from "@fan-ui/solid";

export default function RatingGroupControlledDemo() {
  const [value, setValue] = createSignal(3);
  return (
    <div class="rounded-lg border border-border p-6">
      <p class="text-sm text-muted-foreground mb-2">Value: {value()}</p>
      <RatingGroup count={5} value={value()} onValueChange={(e) => setValue(e.value)} />
    </div>
  );
}
