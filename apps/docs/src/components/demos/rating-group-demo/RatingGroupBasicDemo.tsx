import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function RatingGroupBasicDemo() {
  return (
    <DemoWrapper>
      <p class="text-sm text-muted-foreground mb-2">Basic horizontal</p>
      <RatingGroup count={5} defaultValue={3}>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </DemoWrapper>
  );
}
