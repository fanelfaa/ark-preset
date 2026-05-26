import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { splitProps, type Component } from "solid-js";
import { toggleVariants, type ToggleVariants } from "@ui/core";

const styles = toggleVariants();

export const ToggleRoot: Component<ArkToggle.RootProps & ToggleVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return <ArkToggle.Root class={styles.root({ class: local.class, size: local.size })} {...others} />;
};

export const ToggleIndicator: Component<ArkToggle.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggle.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};
