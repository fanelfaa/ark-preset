import { RatingGroup, RatingGroupLabel } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function RatingGroupDisabledDemo() {
  return (
    <DemoWrapper>
      <p class="text-sm text-muted-foreground mb-2">Disabled</p>
      <RatingGroup count={5} defaultValue={4} disabled>
        <RatingGroupLabel>Rate this</RatingGroupLabel>
      </RatingGroup>
    </DemoWrapper>
  );
}
