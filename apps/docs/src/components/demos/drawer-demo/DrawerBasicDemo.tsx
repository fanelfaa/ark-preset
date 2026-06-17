import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@ark-preset/solid";
import { Input, Separator } from "@ark-preset/solid";

export default function DrawerBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Drawer swipeDirection="start">
        <DrawerTrigger>Edit Profile</DrawerTrigger>
        <DrawerContent>
          <div class="flex flex-col gap-1 px-4 pt-2 pb-4">
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. You can save your changes when done.
            </DrawerDescription>
          </div>
          <Separator />
          <div class="flex flex-col gap-4 p-4">
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
