import { Index, createMemo } from "solid-js";
import { SegmentGroupBase } from "@fan-ui/solid";
import { useSegmentGroup } from "@ark-ui/solid/segment-group";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupRootProviderDemo() {
  const segmentGroup = useSegmentGroup({ defaultValue: "React" });
  const value = createMemo(() => segmentGroup().value);

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <p class="text-sm text-muted-foreground">Selected: {value()}</p>
      <SegmentGroupBase.RootProvider value={segmentGroup}>
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
      </SegmentGroupBase.RootProvider>
    </div>
  );
}
