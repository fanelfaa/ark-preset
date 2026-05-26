import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import {
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger,
  DialogContent as BaseDialogContent,
} from "./dialog.base";

const DialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <BaseDialogContent class={local.class} {...others}>
          {local.children}
          <DialogCloseTrigger>
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
          </DialogCloseTrigger>
        </BaseDialogContent>
      </DialogPositioner>
    </Portal>
  );
};

export { DialogContent };

export * from "./dialog.base";

export { dialogVariants, type DialogVariants } from "@ui/core";
