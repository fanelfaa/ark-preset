import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { ButtonVariants, buttonVariants } from "@ui/core";
import {
  MenuContent as BaseMenuContent,
  MenuIndicator,
  MenuItemIndicator as BaseMenuItemIndicator,
  MenuPositioner,
} from "./menu.base";

const MenuTrigger: Component<ArkMenu.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ArkMenu.Trigger
      class={buttonVariants({
        class: local.class,
        variant: local.variant || "outline",
        size: local.size,
      })}
      {...others}
    >
      {props.children}
      <MenuIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </MenuIndicator>
    </ArkMenu.Trigger>
  );
};

const MenuContent: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <MenuPositioner>
        <BaseMenuContent class={local.class} {...others}>
          {local.children}
        </BaseMenuContent>
      </MenuPositioner>
    </Portal>
  );
};

const MenuItemIndicator: Component<ArkMenu.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <BaseMenuItemIndicator class={local.class} {...others}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </BaseMenuItemIndicator>
  );
};

export { MenuTrigger, MenuContent, MenuItemIndicator };

export * from "./menu.base";

export { menuVariants, type MenuVariants } from "@ui/core";
