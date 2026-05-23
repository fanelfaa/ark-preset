import {
  Toast,
  Toaster as ArkToaster,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/react/toast";
import { forwardRef, type ComponentRef } from "react";
import { toastVariants } from "@ui/core/recipes/toast";

export { createToaster };

type ToasterProps = {
  toaster: CreateToasterReturn;
  className?: string;
};

const Toaster = forwardRef<ComponentRef<typeof ArkToaster>, ToasterProps>(
  ({ className, toaster, ...props }, ref) => {
    const styles = toastVariants();
    return (
      <ArkToaster ref={ref} className={className} toaster={toaster} {...props}>
        {(toast) => (
          <Toast.Root
            className={styles.root({
              class: toast.type === "destructive" ? "destructive" : undefined,
            })}
          >
            <div className="grid gap-1">
              {toast.title && <Toast.Title className={styles.title()}>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description className={styles.description()}>
                  {toast.description}
                </Toast.Description>
              )}
            </div>
            <Toast.CloseTrigger className={styles.closeTrigger()}>✕</Toast.CloseTrigger>
            {toast.action && (
              <Toast.ActionTrigger className={styles.actionTrigger()}>
                {toast.action?.label}
              </Toast.ActionTrigger>
            )}
          </Toast.Root>
        )}
      </ArkToaster>
    );
  },
);
Toaster.displayName = "Toaster";

export { Toaster, toastVariants };
