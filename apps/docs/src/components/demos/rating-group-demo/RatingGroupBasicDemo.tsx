import { RatingGroup, RatingGroupLabel } from "@fan-ui/solid";

export default function RatingGroupBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <p class="text-sm text-muted-foreground mb-2">Basic horizontal</p>
      <RatingGroup count={5} defaultValue={3}>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </div>
  );
}
