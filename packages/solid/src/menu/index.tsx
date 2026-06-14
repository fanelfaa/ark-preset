import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import type { ButtonVariants } from "@fan-ui/core";
import { Menu as MenuBase } from "./menu.base";

const Menu = MenuBase.Root;

const MenuTrigger: Component<ArkMenu.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <MenuBase.Trigger
      class={local.class}
      variant={local.variant || "outline"}
      size={local.size}
      {...others}
    >
      {props.children}
      <MenuBase.Indicator>
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
      </MenuBase.Indicator>
    </MenuBase.Trigger>
  );
};

const MenuContent: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <MenuBase.Positioner>
        <MenuBase.Content class={local.class} {...others}>
          <MenuBase.Arrow />
          {local.children}
        </MenuBase.Content>
      </MenuBase.Positioner>
    </Portal>
  );
};

const MenuItem: Component<ArkMenu.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.Item class={local.class} {...others}>
      <MenuBase.ItemText>{local.children}</MenuBase.ItemText>
      <MenuBase.ItemIndicator>
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
      </MenuBase.ItemIndicator>
    </MenuBase.Item>
  );
};

const MenuTriggerItem: Component<ArkMenu.TriggerItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.TriggerItem class={local.class} {...others}>
      {local.children}
      <MenuBase.Indicator>
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
          <path d="m9 18 6-6-6-6" />
        </svg>
      </MenuBase.Indicator>
    </MenuBase.TriggerItem>
  );
};

const MenuSeparator: Component<ArkMenu.SeparatorProps> = (props) => {
  return <MenuBase.Separator {...props} />;
};

const NestedMenuContent: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.Positioner>
      <MenuBase.Content class={local.class} {...others}>
        {local.children}
      </MenuBase.Content>
    </MenuBase.Positioner>
  );
};

export { Menu };
export {
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuTriggerItem,
  MenuSeparator,
  NestedMenuContent,
  MenuBase,
};
export { menuVariants, type MenuVariants } from "@fan-ui/core";
