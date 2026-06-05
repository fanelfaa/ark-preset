import { Index } from "solid-js";
import { SegmentGroup, SegmentGroupItem } from "@ui/solid";

const frameworks = ["React", "Solid", "Svelte", "Vue"];

export default function SegmentGroupBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Basic horizontal</p>
        <SegmentGroup defaultValue="React">
          <Index each={frameworks}>
            {(framework) => <SegmentGroupItem value={framework()}>{framework()}</SegmentGroupItem>}
          </Index>
        </SegmentGroup>
      </div>

      <div>
        <p class="text-sm text-muted-foreground mb-2">Vertical orientation</p>
        <SegmentGroup defaultValue="Solid" orientation="vertical">
          <Index each={frameworks}>
            {(framework) => <SegmentGroupItem value={framework()}>{framework()}</SegmentGroupItem>}
          </Index>
        </SegmentGroup>
      </div>
    </div>
  );
}
