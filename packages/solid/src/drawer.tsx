import { Drawer as ArkDrawer } from "@ark-ui/solid/drawer";
import { Portal } from "solid-js/web";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { drawerVariants } from "@ui/core";

export const DrawerRoot = ArkDrawer.Root;
export const DrawerTrigger = ArkDrawer.Trigger;

type DrawerContentProps = { class?: string; children?: JSX.Element };

const DrawerContent: Component<DrawerContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = drawerVariants();
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return (
    <Portal>
      <ArkDrawer.Backdrop class={styles.backdrop()} />
      <ArkDrawer.Positioner class={styles.positioner()}>
        <ArkDrawer.Content class={contentClass()} {...others}>
          {local.children}
        </ArkDrawer.Content>
      </ArkDrawer.Positioner>
    </Portal>
  );
};

const DrawerTitle: Component<ArkDrawer.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const styles = drawerVariants();
  const titleClass = createMemo(() => styles.title({ class: local.class }));
  return <ArkDrawer.Title class={titleClass()} {...others} />;
};

const DrawerDescription: Component<ArkDrawer.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const styles = drawerVariants();
  const descriptionClass = createMemo(() => styles.description({ class: local.class }));
  return <ArkDrawer.Description class={descriptionClass()} {...others} />;
};

const DrawerCloseTrigger: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = drawerVariants();
  const closeTriggerClass = createMemo(() => styles.closeTrigger({ class: local.class }));
  return (
    <ArkDrawer.CloseTrigger class={closeTriggerClass()} {...others}>
      {local.children}
    </ArkDrawer.CloseTrigger>
  );
};

const DrawerGrabber: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = drawerVariants();
  const grabberClass = createMemo(() => styles.grabber({ class: local.class }));
  return (
    <ArkDrawer.Grabber class={grabberClass()} {...others}>
      <ArkDrawer.GrabberIndicator class={styles.grabberIndicator()} />
    </ArkDrawer.Grabber>
  );
};

export {
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerCloseTrigger,
  DrawerGrabber,
  drawerVariants,
};
