import {
  Toast,
  Toaster as ArkToaster,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { toastVariants, type ToastVariants } from "@ui/core";

type ToasterProps = {
  toaster: CreateToasterReturn;
  class?: string;
};

const Toaster: Component<ToasterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkToaster class={local.class} {...others}>
      {(toast) => {
        const styles = toastVariants({
          variant: (toast().type as ToastVariants["variant"]) || "default",
        });
        return (
          <Toast.Root class={styles.root()}>
            <div class="grid gap-1">
              {toast().title && <Toast.Title class={styles.title()}>{toast().title}</Toast.Title>}
              {toast().description && (
                <Toast.Description class={styles.description()}>
                  {toast().description}
                </Toast.Description>
              )}
            </div>
            <Toast.CloseTrigger class={styles.closeTrigger()}>✕</Toast.CloseTrigger>
            {toast().action && (
              <Toast.ActionTrigger class={styles.actionTrigger()}>
                {toast().action?.label}
              </Toast.ActionTrigger>
            )}
          </Toast.Root>
        );
      }}
    </ArkToaster>
  );
};

export { createToaster };
export { Toaster };
export { toastVariants };
