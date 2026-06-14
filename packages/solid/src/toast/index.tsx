import {
  Toaster as ArkToaster,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { Toast as ToastBase } from "./toast.base";
import { type ToastVariants } from "@fan-ui/core";
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
          <ToastBase.Root variant={(toast().type as ToastVariants["variant"]) || "default"}>
            <div class="grid gap-1">
              {toast().title && <ToastBase.Title>{toast().title}</ToastBase.Title>}
              {toast().description && (
                <ToastBase.Description>{toast().description}</ToastBase.Description>
              )}
            </div>
            <ToastBase.CloseTrigger>✕</ToastBase.CloseTrigger>
            {toast().action && (
              <ToastBase.ActionTrigger>{toast().action?.label}</ToastBase.ActionTrigger>
            )}
          </ToastBase.Root>
        )}
      </ArkToaster>
    </Portal>
  );
};

export { Toaster, createToaster, ToastBase };

export { toastVariants, type ToastVariants } from "@fan-ui/core";
