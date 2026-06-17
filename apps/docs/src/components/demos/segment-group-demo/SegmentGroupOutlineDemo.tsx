import { Index } from "solid-js";
import { SegmentGroupBase } from "@fan-ui/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupOutlineDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <SegmentGroupBase.Root defaultValue="React" variant="outline">
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
