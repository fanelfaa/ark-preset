import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { splitProps, type Component } from "solid-js";
import { toggleVariants, type ToggleVariants } from "@ark-preset/core";

const styles = toggleVariants();

const Root: Component<ArkToggle.RootProps & ToggleVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <ArkToggle.Root class={styles.root({ class: local.class, size: local.size })} {...others} />
  );
};

const Indicator: Component<ArkToggle.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggle.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const Toggle = { Root, Indicator };
