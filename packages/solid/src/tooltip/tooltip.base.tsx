import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { splitProps, type Component } from "solid-js";
import { tooltipVariants } from "@ui/core";

const styles = tooltipVariants();

export const TooltipRoot = ArkTooltip.Root;
export const TooltipRootProvider = ArkTooltip.RootProvider;

export const TooltipTrigger: Component<ArkTooltip.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

export const TooltipPositioner: Component<ArkTooltip.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

export const TooltipContent: Component<ArkTooltip.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkTooltip.Content
      class={styles.content({ class: local.class })}
      {...others}
      style={`--arrow-size: 10px; ${local.style}`}
    />
  );
};

export const TooltipArrow: Component<ArkTooltip.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

export const TooltipArrowTip: Component<ArkTooltip.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};
