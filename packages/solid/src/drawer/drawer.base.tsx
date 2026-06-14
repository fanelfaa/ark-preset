import { Drawer as ArkDrawer } from "@ark-ui/solid/drawer";
import { splitProps, type Component } from "solid-js";
import { drawerVariants } from "@fan-ui/core";

const styles = drawerVariants();

const Root = ArkDrawer.Root;
const RootProvider = ArkDrawer.RootProvider;

const Trigger: Component<ArkDrawer.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Backdrop: Component<ArkDrawer.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Backdrop class={styles.backdrop({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkDrawer.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Content: Component<ArkDrawer.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Content class={styles.content({ class: local.class })} {...others} />;
};

const CloseTrigger: Component<ArkDrawer.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

const Title: Component<ArkDrawer.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Title class={styles.title({ class: local.class })} {...others} />;
};

const Description: Component<ArkDrawer.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Description class={styles.description({ class: local.class })} {...others} />;
};

const Grabber: Component<ArkDrawer.GrabberProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDrawer.Grabber class={styles.grabber({ class: local.class })} {...others} />;
};

const GrabberIndicator: Component<ArkDrawer.GrabberIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDrawer.GrabberIndicator
      class={styles.grabberIndicator({ class: local.class })}
      {...others}
    />
  );
};

const Context = ArkDrawer.Context;

export const Drawer = {
  Root,
  RootProvider,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  CloseTrigger,
  Title,
  Description,
  Grabber,
  GrabberIndicator,
  Context,
};
