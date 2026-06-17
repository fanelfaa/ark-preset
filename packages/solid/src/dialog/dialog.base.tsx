import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { splitProps, type Component } from "solid-js";
import { buttonVariants, dialogVariants, type ButtonVariants } from "@ark-preset/core";
import { HTMLProps } from "@ark-ui/solid";

const styles = dialogVariants();

const DialogRoot = ArkDialog.Root;
const DialogRootProvider = ArkDialog.RootProvider;
const DialogTrigger: Component<ArkDialog.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ArkDialog.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

const DialogBackdrop: Component<ArkDialog.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Backdrop class={styles.backdrop({ class: local.class })} {...others} />;
};

const DialogPositioner: Component<ArkDialog.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const DialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Content class={styles.content({ class: local.class })} {...others} />;
};

const DialogCloseTrigger: Component<ArkDialog.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

const DialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Title class={styles.title({ class: local.class })} {...others} />;
};

const DialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Description class={styles.description({ class: local.class })} {...others} />;
};

const DialogHeader: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.header({ class: local.class })} {...others} />;
};

const DialogFooter: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.footer({ class: local.class })} {...others} />;
};

export const Dialog = {
  Root: DialogRoot,
  RootProvider: DialogRootProvider,
  Trigger: DialogTrigger,
  Backdrop: DialogBackdrop,
  Positioner: DialogPositioner,
  Content: DialogContent,
  CloseTrigger: DialogCloseTrigger,
  Title: DialogTitle,
  Description: DialogDescription,
  Header: DialogHeader,
  Footer: DialogFooter,
};
