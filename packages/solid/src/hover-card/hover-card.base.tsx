import { HoverCard as ArkHoverCard } from "@ark-ui/solid/hover-card";
import { splitProps, type Component } from "solid-js";
import { hoverCardVariants } from "@ui/core";

const styles = hoverCardVariants();

const Root = ArkHoverCard.Root;
const RootProvider = ArkHoverCard.RootProvider;

const Trigger: Component<ArkHoverCard.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkHoverCard.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Content: Component<ArkHoverCard.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkHoverCard.Content
      class={styles.content({ class: local.class })}
      {...others}
    />
  );
};

const Arrow: Component<ArkHoverCard.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkHoverCard.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

export const HoverCard = {
  Root,
  RootProvider,
  Trigger,
  Positioner,
  Content,
  Arrow,
  ArrowTip,
};
