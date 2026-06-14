import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { splitProps, type Component } from "solid-js";
import { buttonVariants, popoverVariants, type ButtonVariants } from "@fan-ui/core";

const styles = popoverVariants();

const Root = ArkPopover.Root;
const RootProvider = ArkPopover.RootProvider;
const Trigger: Component<ArkPopover.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ArkPopover.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

const Content: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkPopover.Content
      class={styles.content({ class: local.class })}
      style={`--arrow-size: 10px; ${local.style}`}
      {...others}
    />
  );
};

const Title: Component<ArkPopover.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Title class={styles.title({ class: local.class })} {...others} />;
};

const Description: Component<ArkPopover.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Description class={styles.description({ class: local.class })} {...others} />;
};

const CloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
  );
};

const Arrow: Component<ArkPopover.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.Arrow class={styles.arrow({ class: local.class })} {...others}>
      <ArkPopover.ArrowTip class={styles.arrowTip()} {...others} />
    </ArkPopover.Arrow>
  );
};

const Indicator: Component<ArkPopover.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkPopover.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

export const Popover = {
  Root,
  RootProvider,
  Trigger,
  Content,
  Title,
  Description,
  CloseTrigger,
  Arrow,
  Indicator,
  Positioner,
};
