import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupHalfStarDemo() {
  return (
    <div>
      <p class="text-sm text-muted-foreground mb-2">Half stars allowed</p>
      <RatingGroup count={5} defaultValue={2.5} allowHalf>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </div>
  );
}
