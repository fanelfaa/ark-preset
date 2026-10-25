import { useDrawer } from "@ark-ui/solid/drawer";
import {
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerBase,
  Button,
} from "@ark-preset/solid";

export default function DrawerRootProviderDemo() {
  const drawer = useDrawer({ defaultOpen: false, swipeDirection: "start" });

  return (
    <div>
      <Button onClick={() => drawer().setOpen(true)}>Open Drawer</Button>

      <DrawerBase.RootProvider value={drawer} lazyMount unmountOnExit>
        <DrawerContent>
          <DrawerTitle>Externally Controlled Drawer</DrawerTitle>
          <DrawerDescription>This drawer is controlled via useDrawer.</DrawerDescription>
        </DrawerContent>
      </DrawerBase.RootProvider>
    </div>
  );
}
