import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import {
  PopoverCloseTrigger as BasePopoverCloseTrigger,
  PopoverContent as BasePopoverContent,
  PopoverPositioner,
} from "./popover.base";
import { popoverVariants, type PopoverVariants } from "@ui/core";

export const PopoverContent: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <PopoverPositioner>
        <BasePopoverContent class={local.class} {...others}>
          {local.children}
        </BasePopoverContent>
      </PopoverPositioner>
    </Portal>
  );
};

export const PopoverCloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <BasePopoverCloseTrigger class={local.class} {...others}>
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
    </BasePopoverCloseTrigger>
  );
};

export * from "./popover.base";

export { popoverVariants, type PopoverVariants };
