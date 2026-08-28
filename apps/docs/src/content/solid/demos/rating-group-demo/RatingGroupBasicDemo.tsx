import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";

export default function RatingGroupBasicDemo() {
  return (
    <RatingGroup count={5} defaultValue={3}>
      <RatingGroupLabel>Rate this</RatingGroupLabel>
    </RatingGroup>
  );
}
