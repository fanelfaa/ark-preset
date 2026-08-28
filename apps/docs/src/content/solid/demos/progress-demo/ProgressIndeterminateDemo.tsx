import { Progress, ProgressLabel, ProgressTrack } from "@ark-preset/solid";

export default function ProgressIndeterminateDemo() {
  return (
    <Progress>
      <ProgressLabel>Loading...</ProgressLabel>
      <ProgressTrack />
    </Progress>
  );
}
