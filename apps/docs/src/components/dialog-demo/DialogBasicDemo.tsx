import { DialogCloseTrigger } from "@ark-ui/solid";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@ui/solid";
import { Button } from "@ui/solid";

export default function DialogBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <DialogRoot>
        <DialogTrigger asChild={(props) => <Button {...props()} />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. You can save your changes when done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCloseTrigger asChild={(props) => <Button variant="outline" {...props()} />}>
              Cancel
            </DialogCloseTrigger>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
