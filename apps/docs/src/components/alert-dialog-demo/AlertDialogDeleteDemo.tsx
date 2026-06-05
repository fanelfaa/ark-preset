import { useDialog, type UseDialogReturn } from "@ark-ui/solid/dialog";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogBase,
} from "@ui/solid";
import { Button } from "@ui/solid";
import { type Component, createSignal } from "solid-js";

interface DeleteAlertDialogProps {
  dialog: UseDialogReturn;
  title: string;
  description: string;
  onDelete: () => void;
}

const DeleteAlertDialog: Component<DeleteAlertDialogProps> = (props) => {
  return (
    <AlertDialogBase.RootProvider value={props.dialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => props.onDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogBase.RootProvider>
  );
};

export default function AlertDialogDeleteDemo() {
  const dialog = useDialog({ defaultOpen: false });
  const [deleted, setDeleted] = createSignal(false);

  const handleDelete = () => {
    dialog().setOpen(false);
    setDeleted(true);
  };

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <p class="text-sm text-muted-foreground">Open: {JSON.stringify(dialog().open)}</p>

      <Button onClick={() => dialog().setOpen(true)} variant="destructive" disabled={deleted()}>
        {deleted() ? "Account Deleted" : "Delete Account"}
      </Button>

      {deleted() && <p class="text-sm text-destructive">Account has been deleted. (Demo only)</p>}

      <DeleteAlertDialog
        dialog={dialog}
        title="Delete Account"
        description="This will permanently delete your account and remove your data from our servers."
        onDelete={handleDelete}
      />
    </div>
  );
}
