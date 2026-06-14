import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import { splitProps, type Component } from "solid-js";
import { progressVariants } from "@fan-ui/core";

const styles = progressVariants();

const Root: Component<ArkProgress.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkProgress.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkProgress.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Label class={styles.label({ class: local.class })} {...others} />;
};

const Track: Component<ArkProgress.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Track class={styles.track({ class: local.class })} {...others} />;
};

const Range: Component<ArkProgress.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Range class={styles.range({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkProgress.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const View: Component<ArkProgress.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.View class={styles.view({ class: local.class })} {...others} />;
};

export const Progress = { Root, RootProvider, Label, Track, Range, ValueText, View };
