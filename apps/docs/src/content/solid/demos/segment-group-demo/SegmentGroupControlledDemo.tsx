import { Index, createSignal } from "solid-js";
import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupControlledDemo() {
  const [value, setValue] = createSignal("Solid");

  return (
    <div class="space-y-4">
      <p class="text-sm text-muted-foreground">Selected: {value()}</p>
      <SegmentGroup value={value()} onValueChange={(e: any) => setValue(e.value || "Solid")}>
        <Index each={frameworks}>
          {(framework) => <SegmentGroupItem value={framework()}>{framework()}</SegmentGroupItem>}
        </Index>
      </SegmentGroup>
    </div>
  );
}
