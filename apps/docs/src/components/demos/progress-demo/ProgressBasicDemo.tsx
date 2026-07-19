import { DemoWrapper } from "../../DemoWrapper";
import { Progress, ProgressLabel, ProgressTrack, ProgressValueText } from "@ark-preset/solid";

export default function ProgressBasicDemo() {
  return (
    <DemoWrapper class="flex flex-col gap-3">
      <Progress value={65} class="space-y-2">
        <div class="flex items-center justify-between">
          <ProgressLabel>Loading</ProgressLabel>
          <ProgressValueText />
        </div>
        <ProgressTrack />
      </Progress>
    </DemoWrapper>
  );
}
