import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupBasicDemo() {
  return (
    <div>
      <p class="text-sm text-muted-foreground mb-2">Basic horizontal</p>
      <RatingGroup count={5} defaultValue={3}>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </div>
  );
}
