import { Toast as ArkToast } from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { ToastVariants, toastVariants } from "@ui/core";

const styles = toastVariants();

export const ToastRoot: Component<ArkToast.RootProps & ToastVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return (
    <ArkToast.Root
      class={styles.root({ class: local.class, variant: local.variant })}
      {...others}
    />
  );
};

export const ToastTitle: Component<ArkToast.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Title class={styles.title({ class: local.class })} {...others} />;
};

export const ToastDescription: Component<ArkToast.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Description class={styles.description({ class: local.class })} {...others} />;
};

export const ToastCloseTrigger: Component<ArkToast.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

export const ToastActionTrigger: Component<ArkToast.ActionTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkToast.ActionTrigger class={styles.actionTrigger({ class: local.class })} {...others} />
  );
};
