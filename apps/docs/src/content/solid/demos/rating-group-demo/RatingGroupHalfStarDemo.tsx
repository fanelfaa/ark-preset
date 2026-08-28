import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupHalfStarDemo() {
  return (
    <RatingGroup count={5} defaultValue={2.5} allowHalf>
      <RatingGroupLabel>Rate this</RatingGroupLabel>
    </RatingGroup>
  );
}
