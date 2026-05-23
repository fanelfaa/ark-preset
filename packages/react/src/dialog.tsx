import { Dialog } from "@ark-ui/react/dialog";
import { createPortal } from "react-dom";
import { forwardRef, type ComponentRef, type HTMLAttributes } from "react";
import { dialogVariants } from "@ui/core/recipes/dialog";

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;

type DialogContentProps = { className?: string; children?: React.ReactNode };

const DialogContent = forwardRef<ComponentRef<typeof Dialog.Content>, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const styles = dialogVariants();
    return createPortal(
      <>
        <Dialog.Backdrop className={styles.backdrop()} />
        <Dialog.Positioner className={styles.positioner()}>
          <Dialog.Content ref={ref} className={styles.content({ class: className })} {...props}>
            {children}
            <Dialog.CloseTrigger className={styles.closeTrigger()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </>,
      document.body,
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef<ComponentRef<"div">, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const styles = dialogVariants();
    return <div ref={ref} className={styles.header({ class: className })} {...props} />;
  },
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = forwardRef<ComponentRef<"div">, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const styles = dialogVariants();
    return <div ref={ref} className={styles.footer({ class: className })} {...props} />;
  },
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<ComponentRef<typeof Dialog.Title>, Dialog.TitleProps>(
  (props, ref) => {
    const styles = dialogVariants();
    return <Dialog.Title ref={ref} className={styles.title()} {...props} />;
  },
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef<
  ComponentRef<typeof Dialog.Description>,
  Dialog.DescriptionProps
>((props, ref) => {
  const styles = dialogVariants();
  return <Dialog.Description ref={ref} className={styles.description()} {...props} />;
});
DialogDescription.displayName = "DialogDescription";

export {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogVariants,
};
