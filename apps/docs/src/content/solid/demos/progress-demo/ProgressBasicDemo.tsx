import { Progress, ProgressLabel, ProgressTrack, ProgressValueText } from "@ark-preset/solid";

export default function ProgressBasicDemo() {
  return (
    <Progress value={65} class="space-y-2">
      <ProgressLabel>Loading</ProgressLabel>
      <ProgressTrack />
      <ProgressValueText />
    </Progress>
  );
}
