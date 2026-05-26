import {
  Toaster as ArkToaster,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastActionTrigger,
} from "./toast.base";
import { type ToastVariants } from "@ui/core";
import { Portal } from "solid-js/web";

type ToasterProps = {
  toaster: CreateToasterReturn;
  class?: string;
};

const Toaster: Component<ToasterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Portal>
      <ArkToaster class={local.class} {...others}>
        {(toast) => (
          <ToastRoot variant={(toast().type as ToastVariants["variant"]) || "default"}>
            <div class="grid gap-1">
              {toast().title && <ToastTitle>{toast().title}</ToastTitle>}
              {toast().description && <ToastDescription>{toast().description}</ToastDescription>}
            </div>
            <ToastCloseTrigger>✕</ToastCloseTrigger>
            {toast().action && <ToastActionTrigger>{toast().action?.label}</ToastActionTrigger>}
          </ToastRoot>
        )}
      </ArkToaster>
    </Portal>
  );
};

export { Toaster, createToaster };

export * from "./toast.base";

export { toastVariants, type ToastVariants } from "@ui/core";
