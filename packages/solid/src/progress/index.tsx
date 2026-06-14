import { splitProps, type Component } from "solid-js";
import { Progress as ProgressBase } from "./progress.base";
import { Progress as ArkProgress } from "@ark-ui/solid/progress";

const Progress = ProgressBase.Root;
const ProgressRootProvider = ProgressBase.RootProvider;
const ProgressLabel = ProgressBase.Label;
const ProgressValueText = ProgressBase.ValueText;

// Composite wrappers — auto-include sub-parts
const ProgressTrack: Component<ArkProgress.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ProgressBase.Track {...others}>
      <ProgressBase.Range />
      {local.children}
    </ProgressBase.Track>
  );
};

export {
  Progress,
  ProgressRootProvider,
  ProgressLabel,
  ProgressTrack,
  ProgressValueText,
  ProgressBase,
};

export { progressVariants, type ProgressVariants } from "@fan-ui/core";
