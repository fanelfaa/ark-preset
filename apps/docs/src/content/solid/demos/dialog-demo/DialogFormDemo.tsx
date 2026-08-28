import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCloseTrigger,
  Button,
  Input,
} from "@ark-preset/solid";

export default function DialogFormDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>Add User</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the details for the new user below.</DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <Input label="Name" placeholder="John Doe" />
          <Input label="Username" placeholder="@johndoe" />
        </div>
        <DialogFooter>
          <DialogCloseTrigger variant="outline">Cancel</DialogCloseTrigger>
          <Button>Save User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
