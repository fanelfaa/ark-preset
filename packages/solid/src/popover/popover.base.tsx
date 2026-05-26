import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { splitProps, type Component } from "solid-js";
import { popoverVariants } from "@ui/core";

const styles = popoverVariants();

export const PopoverRoot = ArkPopover.Root;
export const PopoverRootProvider = ArkPopover.RootProvider;
export const PopoverTrigger = ArkPopover.Trigger;

export const PopoverContent: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkPopover.Content
      class={styles.content({ class: local.class })}
      style={`--arrow-size: 10px; ${local.style}`}
      {...others}
    />
  );
};

export const PopoverTitle: Component<ArkPopover.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Title class={styles.title({ class: local.class })} {...others} />;
};

export const PopoverDescription: Component<ArkPopover.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Description class={styles.description({ class: local.class })} {...others} />;
};

export const PopoverCloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
  );
};

export const PopoverArrow: Component<ArkPopover.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.Arrow class={styles.arrow({ class: local.class })} {...others}>
      <ArkPopover.ArrowTip class={styles.arrowTip()} {...others} />
    </ArkPopover.Arrow>
  );
};

export const PopoverIndicator: Component<ArkPopover.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const PopoverPositioner: Component<ArkPopover.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};
