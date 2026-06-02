import { DialogCloseTrigger } from "@ark-ui/solid";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Input,
  RadioGroupBase,
  Separator,
} from "@ui/solid";
import { Button } from "@ui/solid";

export default function DialogBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <DialogRoot>
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
            <RadioGroupBase.Root class="flex flex-col gap-2">
              <RadioGroupBase.Label class="text-sm font-medium">Notification preferences</RadioGroupBase.Label>
              <RadioGroupBase.Item value="all">
                <RadioGroupBase.ItemControl />
                <RadioGroupBase.ItemText>All notifications</RadioGroupBase.ItemText>
              </RadioGroupBase.Item>
              <RadioGroupBase.Item value="mentions">
                <RadioGroupBase.ItemControl />
                <RadioGroupBase.ItemText>Mentions only</RadioGroupBase.ItemText>
              </RadioGroupBase.Item>
              <RadioGroupBase.Item value="none">
                <RadioGroupBase.ItemControl />
                <RadioGroupBase.ItemText>No notifications</RadioGroupBase.ItemText>
              </RadioGroupBase.Item>
            </RadioGroupBase.Root>
          </div>
          <Separator />
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
