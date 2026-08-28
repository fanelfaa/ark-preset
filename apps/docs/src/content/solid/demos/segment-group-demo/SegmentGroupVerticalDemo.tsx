import { SegmentGroup, SegmentGroupItem } from "@ark-preset/solid";

export default function SegmentGroupVerticalDemo() {
  return (
    <SegmentGroup defaultValue="Svelte" orientation="vertical">
      <SegmentGroupItem value="Svelte">Svelte</SegmentGroupItem>
      <SegmentGroupItem value="Vue">Vue</SegmentGroupItem>
    </SegmentGroup>
  );
}
