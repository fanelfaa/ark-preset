import { Toast as ArkToast } from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { type ToastVariants, toastVariants } from "@ark-preset/core";

const styles = toastVariants();

const Root: Component<ArkToast.RootProps & ToastVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return (
    <ArkToast.Root
      class={styles.root({ class: local.class, variant: local.variant })}
      {...others}
    />
  );
};

const Title: Component<ArkToast.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Title class={styles.title({ class: local.class })} {...others} />;
};

const Description: Component<ArkToast.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Description class={styles.description({ class: local.class })} {...others} />;
};

const CloseTrigger: Component<ArkToast.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

const ActionTrigger: Component<ArkToast.ActionTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkToast.ActionTrigger class={styles.actionTrigger({ class: local.class })} {...others} />
  );
};

export const Toast = { Root, Title, Description, CloseTrigger, ActionTrigger };
