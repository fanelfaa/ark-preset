import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";

export default function SegmentGroupBasicDemo() {
  return (
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem value="React">React</SegmentGroupItem>
      <SegmentGroupItem value="Solid">Solid</SegmentGroupItem>
      <SegmentGroupItem value="Vue">Vue</SegmentGroupItem>
    </SegmentGroup>
  );
}
