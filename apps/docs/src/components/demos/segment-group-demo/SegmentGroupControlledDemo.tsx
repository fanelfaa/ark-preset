import { Index, createSignal } from "solid-js";
import { SegmentGroupBase } from "@fan-ui/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupControlledDemo() {
  const [value, setValue] = createSignal("Solid");

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
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
    </div>
  );
}
