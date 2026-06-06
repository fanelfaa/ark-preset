import { RatingGroup, RatingGroupLabel } from "@ui/solid";

export default function RatingGroupHalfStarDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <p class="text-sm text-muted-foreground mb-2">Half stars allowed</p>
      <RatingGroup count={5} defaultValue={2.5} allowHalf>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </div>
  );
}
