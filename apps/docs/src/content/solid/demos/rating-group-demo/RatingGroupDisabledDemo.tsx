import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupDisabledDemo() {
  return (
    <RatingGroup count={5} defaultValue={4} disabled>
      <RatingGroupLabel>Rate this</RatingGroupLabel>
    </RatingGroup>
  );
}
