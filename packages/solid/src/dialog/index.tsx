import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { Dialog as DialogBase } from "./dialog.base";

const DialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <DialogBase.Backdrop />
      <DialogBase.Positioner>
        <DialogBase.Content class={local.class} {...others}>
          {local.children}
          <DialogBase.CloseTrigger>
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
          </DialogBase.CloseTrigger>
        </DialogBase.Content>
      </DialogBase.Positioner>
    </Portal>
  );
};

const Dialog = DialogBase.Root;
const DialogTrigger = DialogBase.Trigger;
const DialogHeader = DialogBase.Header;
const DialogTitle = DialogBase.Title;
const DialogDescription = DialogBase.Description;
const DialogFooter = DialogBase.Footer;

export {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogContent,
  DialogBase,
};

export { dialogVariants, type DialogVariants } from "@fan-ui/core";
