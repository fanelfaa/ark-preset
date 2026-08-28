import { Index } from "solid-js";
import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";

const frameworks = ["React", "Solid", "Vue"];

export default function SegmentGroupOutlineDemo() {
  return (
    <div>
      <SegmentGroup defaultValue="React" variant="outline">
        <Index each={frameworks}>
          {(framework) => <SegmentGroupItem value={framework()}>{framework()}</SegmentGroupItem>}
        </Index>
      </SegmentGroup>
    </div>
  );
}
