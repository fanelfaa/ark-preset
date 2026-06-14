import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { splitProps, type Component } from "solid-js";
import { tooltipVariants } from "@fan-ui/core";

const styles = tooltipVariants();

const Root = ArkTooltip.Root;
const RootProvider = ArkTooltip.RootProvider;

const Trigger: Component<ArkTooltip.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkTooltip.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Content: Component<ArkTooltip.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkTooltip.Content
      class={styles.content({ class: local.class })}
      {...others}
      style={`--arrow-size: 10px; ${local.style}`}
    />
  );
};

const Arrow: Component<ArkTooltip.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkTooltip.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

export const Tooltip = {
  Root,
  RootProvider,
  Trigger,
  Positioner,
  Content,
  Arrow,
  ArrowTip,
};
