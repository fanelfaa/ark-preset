import { createSignal } from "solid-js";
import { DemoWrapper } from "../../DemoWrapper";
import { RatingGroup } from "@ark-preset/solid";

export default function RatingGroupControlledDemo() {
  const [value, setValue] = createSignal(3);
  return (
    <DemoWrapper>
      <p class="text-sm text-muted-foreground mb-2">Value: {value()}</p>
      <RatingGroup count={5} value={value()} onValueChange={(e) => setValue(e.value)} />
    </DemoWrapper>
  );
}
