import { Index } from "solid-js";
import { DemoWrapper } from "../../DemoWrapper";
import { SegmentGroupBase } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupDisabledDemo() {
  return (
    <DemoWrapper>
      <SegmentGroupBase.Root defaultValue="React">
        <SegmentGroupBase.Indicator />
        <Index each={frameworks}>
          {(framework) => (
            <SegmentGroupBase.Item value={framework()} disabled={framework() === "Vue"}>
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
