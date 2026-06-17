import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <p class="text-sm text-muted-foreground mb-2">Disabled</p>
      <RatingGroup count={5} defaultValue={4} disabled>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </div>
  );
}
