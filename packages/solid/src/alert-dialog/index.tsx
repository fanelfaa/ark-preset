import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { AlertDialog as AlertDialogBase } from "./alert-dialog.base";

const AlertDialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <AlertDialogBase.Backdrop />
      <AlertDialogBase.Positioner>
        <AlertDialogBase.Content class={local.class} {...others}>
          {local.children}
          <AlertDialogBase.CloseTrigger>
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
          </AlertDialogBase.CloseTrigger>
        </AlertDialogBase.Content>
      </AlertDialogBase.Positioner>
    </Portal>
  );
};

const AlertDialog = AlertDialogBase.Root;
const AlertDialogTrigger = AlertDialogBase.Trigger;
const AlertDialogHeader = AlertDialogBase.Header;
const AlertDialogTitle = AlertDialogBase.Title;
const AlertDialogDescription = AlertDialogBase.Description;
const AlertDialogFooter = AlertDialogBase.Footer;
const AlertDialogCancel = AlertDialogBase.Cancel;
const AlertDialogAction = AlertDialogBase.Action;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogBase,
};

export { alertDialogVariants, type AlertDialogVariants } from "@fan-ui/core";
