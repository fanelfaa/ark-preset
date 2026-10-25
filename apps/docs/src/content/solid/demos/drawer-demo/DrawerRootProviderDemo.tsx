import { useDrawer } from "@ark-ui/solid/drawer";
import {
  DrawerRootProvider,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  Button,
} from "@ark-preset/solid";

export default function DrawerRootProviderDemo() {
  const drawer = useDrawer({ defaultOpen: false, swipeDirection: "start" });

  return (
    <div>
      <Button onClick={() => drawer().setOpen(true)}>Open Drawer</Button>

      <DrawerRootProvider value={drawer} lazyMount unmountOnExit>
        <DrawerContent>
          <DrawerTitle>Externally Controlled Drawer</DrawerTitle>
          <DrawerDescription>This drawer is controlled via useDrawer.</DrawerDescription>
        </DrawerContent>
      </DrawerRootProvider>
    </div>
  );
}
