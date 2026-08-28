import { createSignal } from "solid-js";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, Button } from "@ark-preset/solid";

export default function DialogControlledDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex items-center gap-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open()} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
