import { Index } from "solid-js";
import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupDisabledDemo() {
  return (
    <div>
      <SegmentGroup defaultValue="React">
        <Index each={frameworks}>
          {(framework) => (
            <SegmentGroupItem value={framework()} disabled={framework() === "Vue"}>
              {framework()}
            </SegmentGroupItem>
          )}
        </Index>
      </SegmentGroup>
    </div>
  );
}
