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
const AlertDialogUnstyledCloseTrigger = ArkDialog.CloseTrigger;

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
  AlertDialogUnstyledCloseTrigger,
  AlertDialogBase,
};

export { alertDialogVariants, type AlertDialogVariants } from "@ark-preset/core";
