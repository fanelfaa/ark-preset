import { Index } from "solid-js";
import { DemoWrapper } from "../../DemoWrapper";
import { SegmentGroupBase } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupOutlineDemo() {
  return (
    <DemoWrapper>
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
    </DemoWrapper>
  );
}
