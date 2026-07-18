import { Index, createSignal } from "solid-js";
import { DemoWrapper } from "../../DemoWrapper";
import { SegmentGroupBase } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupControlledDemo() {
  const [value, setValue] = createSignal("Solid");

  return (
    <DemoWrapper class="space-y-4">
      <p class="text-sm text-muted-foreground">Selected: {value()}</p>
      <SegmentGroupBase.Root value={value()} onValueChange={(e) => setValue(e.value || "Solid")}>
        <SegmentGroupBase.Indicator />
        <Index each={frameworks}>
          {(framework) => (
            <SegmentGroupBase.Item value={framework()}>
              <SegmentGroupBase.ItemText>{framework()}</SegmentGroupBase.ItemText>
              <SegmentGroupBase.ItemControl />
              <SegmentGroupBase.ItemHiddenInput />
            </SegmentGroupBase.Item>
          )}
        </Index>
      </SegmentGroupBase.Root>
    </DemoWrapper>
  );
}
