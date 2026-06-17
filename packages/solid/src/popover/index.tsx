import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { Popover as PopoverBase } from "./popover.base";
import { popoverVariants, type PopoverVariants } from "@ark-preset/core";

const PopoverCloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <PopoverBase.CloseTrigger class={local.class} {...others}>
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
    </PopoverBase.CloseTrigger>
  );
};

export const PopoverContent: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <PopoverBase.Positioner>
        <PopoverBase.Content class={local.class} {...others}>
          <PopoverBase.Arrow />
          {local.children}
          <PopoverCloseTrigger />
        </PopoverBase.Content>
      </PopoverBase.Positioner>
    </Portal>
  );
};

const Popover = PopoverBase.Root;
const PopoverTrigger = PopoverBase.Trigger;
const PopoverTitle = PopoverBase.Title;
const PopoverDescription = PopoverBase.Description;

export { Popover, PopoverTrigger, PopoverTitle, PopoverDescription, PopoverBase };

export { popoverVariants, type PopoverVariants };
