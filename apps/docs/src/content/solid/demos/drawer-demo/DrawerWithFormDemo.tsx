import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  Input,
} from "@ark-preset/solid";

export default function DrawerWithFormDemo() {
  return (
    <div>
      <Drawer swipeDirection="start">
        <DrawerTrigger>Edit Profile</DrawerTrigger>
        <DrawerContent>
          <div class="flex flex-col gap-1 px-4 pt-2 pb-4">
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>Update your personal information.</DrawerDescription>
          </div>
          <div class="flex flex-col gap-4 p-4">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
