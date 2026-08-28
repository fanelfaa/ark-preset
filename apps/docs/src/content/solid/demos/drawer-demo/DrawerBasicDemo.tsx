import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@ark-preset/solid";

export default function DrawerBasicDemo() {
  return (
    <div>
      <Drawer swipeDirection="start">
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description text</DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
