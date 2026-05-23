import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { createMemo, splitProps, type Component } from "solid-js";
import { ToggleVariants, toggleVariants } from "@ui/core";

const styles = toggleVariants();

const ToggleRoot: Component<ArkToggle.RootProps & ToggleVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  const rootClass = createMemo(() => styles.root({ class: local.class, size: local.size }));
  return <ArkToggle.Root class={rootClass()} {...others} />;
};

const ToggleIndicator: Component<ArkToggle.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const indicatorClass = createMemo(() => styles.indicator({ class: local.class }));
  return <ArkToggle.Indicator class={indicatorClass()} {...others} />;
};

export { ToggleRoot as Toggle, ToggleIndicator, toggleVariants };
