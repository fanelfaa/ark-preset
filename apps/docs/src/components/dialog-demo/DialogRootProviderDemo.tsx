import { useDialog } from "@ark-ui/solid/dialog";
import {
  DialogRootProvider,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@ui/solid";
import { Button } from "@ui/solid";

export default function DialogRootProviderDemo() {
  const dialog = useDialog({ defaultOpen: false });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(dialog().open)}
      </output>

      <div class="flex gap-2">
        <Button onClick={() => dialog().setOpen(true)} variant="secondary">
          Open Dialog From Outside
        </Button>
      </div>

      <DialogRootProvider value={dialog}>
        <DialogTrigger asChild={(props) => <Button {...props()} />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Externally Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled via <code>useDialog</code>. The buttons and output above
              manage the state from outside the dialog tree.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => dialog().setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => dialog().setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRootProvider>
    </div>
  );
}
