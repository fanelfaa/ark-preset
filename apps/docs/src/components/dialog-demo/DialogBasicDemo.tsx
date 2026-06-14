import { DialogCloseTrigger } from "@ark-ui/solid";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@fan-ui/solid";
import { Button, Input, RadioGroup, RadioGroupItem, RadioGroupBase, Separator } from "@fan-ui/solid";

export default function DialogBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Dialog>
        <DialogTrigger asChild={(props) => <Button {...props()} />}>Edit Profile</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. You can save your changes when done.
            </DialogDescription>
          </DialogHeader>
          <div class="flex flex-col gap-4 py-4">
            <Input
              label="Name"
              placeholder="Your name"
              description="This will be displayed on your profile."
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              description="We'll never share your email."
            />
            <RadioGroup>
              <RadioGroupBase.Label class="text-sm font-medium">
                Notification preferences
              </RadioGroupBase.Label>
              <div class="flex flex-row gap-6">
                <RadioGroupItem value="all">All notifications</RadioGroupItem>
                <RadioGroupItem value="mentions">Mentions only</RadioGroupItem>
                <RadioGroupItem value="none">No notifications</RadioGroupItem>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          <DialogFooter>
            <DialogCloseTrigger asChild={(props) => <Button variant="outline" {...props()} />}>
              Cancel
            </DialogCloseTrigger>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
