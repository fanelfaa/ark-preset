import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { splitProps, type Component } from "solid-js";
import { alertDialogVariants, buttonVariants, type ButtonVariants } from "@fan-ui/core";
import { HTMLProps } from "@ark-ui/solid";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = alertDialogVariants();

const AlertDialogRoot = ArkDialog.Root;
const AlertDialogRootProvider = ArkDialog.RootProvider;
const AlertDialogTrigger = ArkDialog.Trigger;

const AlertDialogBackdrop: Component<ArkDialog.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Backdrop class={styles.backdrop({ class: local.class })} {...others} />;
};

const AlertDialogPositioner: Component<ArkDialog.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const AlertDialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Content class={styles.content({ class: local.class })} {...others} />;
};

const AlertDialogCloseTrigger: Component<ArkDialog.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

const AlertDialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Title class={styles.title({ class: local.class })} {...others} />;
};

const AlertDialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDialog.Description class={styles.description({ class: local.class })} {...others} />;
};

const AlertDialogHeader: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.header({ class: local.class })} {...others} />;
};

const AlertDialogFooter: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.footer({ class: local.class })} {...others} />;
};

const AlertDialogCancel: Component<
  HTMLProps<"button"> & ArkDialog.CloseTriggerProps & ButtonVariants
> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ArkDialog.CloseTrigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

const AlertDialogAction: Component<HTMLArkProps<"button"> & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ark.button
      type="button"
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

export const AlertDialog = {
  Root: AlertDialogRoot,
  RootProvider: AlertDialogRootProvider,
  Trigger: AlertDialogTrigger,
  Backdrop: AlertDialogBackdrop,
  Positioner: AlertDialogPositioner,
  Content: AlertDialogContent,
  CloseTrigger: AlertDialogCloseTrigger,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
};
