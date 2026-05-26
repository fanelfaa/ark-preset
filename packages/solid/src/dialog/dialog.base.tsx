import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { splitProps, type Component } from "solid-js";
import { dialogVariants } from "@ui/core";
import { HTMLProps } from "@ark-ui/solid";

const styles = dialogVariants();

export const DialogRoot = ArkDialog.Root;
export const DialogRootProvider = ArkDialog.RootProvider;
export const DialogTrigger = ArkDialog.Trigger;

export const DialogBackdrop: Component<ArkDialog.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Backdrop class={styles.backdrop({ class: local.class })} {...others} />;
};

export const DialogPositioner: Component<ArkDialog.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

export const DialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Content class={styles.content({ class: local.class })} {...others} />;
};

export const DialogCloseTrigger: Component<ArkDialog.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

export const DialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Title class={styles.title({ class: local.class })} {...others} />;
};

export const DialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Description class={styles.description({ class: local.class })} {...others} />;
};

export const DialogHeader: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.header({ class: local.class })} {...others} />;
};

export const DialogFooter: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.footer({ class: local.class })} {...others} />;
};
