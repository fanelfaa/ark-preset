import { Drawer as ArkDrawer } from "@ark-ui/solid/drawer";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { Drawer as DrawerBase } from "./drawer.base";

const DrawerContent: Component<ArkDrawer.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <DrawerBase.Backdrop />
      <DrawerBase.Positioner>
        <DrawerBase.Content class={local.class} {...others}>
          {local.children}
          <DrawerBase.CloseTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </DrawerBase.CloseTrigger>
        </DrawerBase.Content>
      </DrawerBase.Positioner>
    </Portal>
  );
};

const Drawer = DrawerBase.Root;
const DrawerTrigger = DrawerBase.Trigger;
const DrawerTitle = DrawerBase.Title;
const DrawerDescription = DrawerBase.Description;

const DrawerGrabber: Component<ArkDrawer.GrabberProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerBase.Grabber class={local.class} {...others}>
      <DrawerBase.GrabberIndicator />
    </DrawerBase.Grabber>
  );
};

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerGrabber,
  DrawerBase,
};

export { drawerVariants, type DrawerVariants } from "@ark-preset/core";
