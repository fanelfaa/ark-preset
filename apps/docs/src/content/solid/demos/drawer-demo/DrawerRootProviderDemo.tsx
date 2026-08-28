import { useDrawer } from "@ark-ui/solid/drawer";
import {
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerBase,
  Button,
} from "@ark-preset/solid";

export default function DrawerRootProviderDemo() {
  const drawer = useDrawer({ defaultOpen: false });

  return (
    <div>
      <Button onClick={() => drawer().setOpen(true)}>Open Drawer</Button>

      <DrawerBase.RootProvider value={drawer}>
        <DrawerTrigger style="display:none">Hidden Trigger</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Externally Controlled Drawer</DrawerTitle>
          <DrawerDescription>This drawer is controlled via useDrawer.</DrawerDescription>
        </DrawerContent>
      </DrawerBase.RootProvider>
    </div>
  );
}
