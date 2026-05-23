import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { dialogVariants } from "@ui/core";

const styles = dialogVariants();

export const DialogRoot = ArkDialog.Root;
export const DialogRootProvider = ArkDialog.RootProvider;
export const DialogTrigger = ArkDialog.Trigger;

type DialogContentProps = { class?: string; children?: JSX.Element };

const DialogContent: Component<DialogContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return (
    <Portal>
      <ArkDialog.Backdrop class={styles.backdrop()} />
      <ArkDialog.Positioner class={styles.positioner()}>
        <ArkDialog.Content class={contentClass()} {...others}>
          {local.children}
          <ArkDialog.CloseTrigger class={styles.closeTrigger()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  );
};

const DialogHeader: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const headerClass = createMemo(() => styles.header({ class: local.class }));
  return (
    <div class={headerClass()} {...others}>
      {local.children}
    </div>
  );
};

const DialogFooter: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const footerClass = createMemo(() => styles.footer({ class: local.class }));
  return (
    <div class={footerClass()} {...others}>
      {local.children}
    </div>
  );
};

const DialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const titleClass = createMemo(() => styles.title({ class: local.class }));
  return <ArkDialog.Title class={titleClass()} {...others} />;
};

const DialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const descriptionClass = createMemo(() => styles.description({ class: local.class }));
  return <ArkDialog.Description class={descriptionClass()} {...others} />;
};

export {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogVariants,
};
