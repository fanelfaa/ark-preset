import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import { splitProps, type Component } from "solid-js";
import { progressVariants } from "@ui/core";

const styles = progressVariants();

export const ProgressRoot: Component<ArkProgress.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Root class={styles.root({ class: local.class })} {...others} />;
};

export const ProgressRootProvider: Component<ArkProgress.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const ProgressLabel: Component<ArkProgress.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Label class={styles.label({ class: local.class })} {...others} />;
};

export const ProgressTrack: Component<ArkProgress.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Track class={styles.track({ class: local.class })} {...others} />;
};

export const ProgressRange: Component<ArkProgress.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Range class={styles.range({ class: local.class })} {...others} />;
};

export const ProgressValueText: Component<ArkProgress.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

export const ProgressView: Component<ArkProgress.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.View class={styles.view({ class: local.class })} {...others} />;
};
