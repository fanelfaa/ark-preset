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
        <DialogTrigger asChild={(p: any) => <Button {...p} />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. You can save your changes when done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
