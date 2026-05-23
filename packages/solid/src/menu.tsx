import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { Portal } from "solid-js/web";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { ButtonVariants, buttonVariants, menuVariants } from "@ui/core";

// Global variant instance (no params)
const styles = menuVariants();

export const MenuRoot = ArkMenu.Root;
export const MenuIndicator = ArkMenu.Indicator;
export const MenuPositioner = ArkMenu.Positioner;
export const MenuArrow = ArkMenu.Arrow;
export const MenuArrowTip = ArkMenu.ArrowTip;
export const MenuSeparator = ArkMenu.Separator;
export const MenuContextTrigger = ArkMenu.ContextTrigger;
export const MenuTriggerItem = ArkMenu.TriggerItem;
export const MenuRadioItemGroup = ArkMenu.RadioItemGroup;

const MenuTrigger: Component<ArkMenu.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  const triggerClass = createMemo(() =>
    buttonVariants({ class: local.class, variant: local.variant || "outline", size: local.size }),
  );
  return (
    <ArkMenu.Trigger class={triggerClass()} {...others}>
      {props.children}
      <ArkMenu.Indicator class={styles.indicator()}>
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
      </ArkMenu.Indicator>
    </ArkMenu.Trigger>
  );
};

type MenuContentProps = ArkMenu.ContentProps & { class?: string; children?: JSX.Element };

const MenuContent: Component<MenuContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return (
    <Portal>
      <ArkMenu.Positioner class={styles.positioner()}>
        <ArkMenu.Content class={contentClass()} {...others}>
          {local.children}
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </Portal>
  );
};

const MenuItem: Component<ArkMenu.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemClass = createMemo(() => styles.item({ class: local.class }));
  return <ArkMenu.Item class={itemClass()} {...others} />;
};

const MenuItemText: Component<ArkMenu.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemTextClass = createMemo(() => styles.itemText({ class: local.class }));
  return <ArkMenu.ItemText class={itemTextClass()} {...others} />;
};

const MenuItemIndicator: Component<ArkMenu.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemIndicatorClass = createMemo(() => styles.itemIndicator({ class: local.class }));
  return (
    <ArkMenu.ItemIndicator class={itemIndicatorClass()} {...others}>
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
    </ArkMenu.ItemIndicator>
  );
};

const MenuCheckboxItem: Component<ArkMenu.CheckboxItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const checkboxItemClass = createMemo(() => styles.checkboxItem({ class: local.class }));
  return <ArkMenu.CheckboxItem class={checkboxItemClass()} {...others} />;
};

const MenuRadioItem: Component<ArkMenu.RadioItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const radioItemClass = createMemo(() => styles.radioItem({ class: local.class }));
  return <ArkMenu.RadioItem class={radioItemClass()} {...others} />;
};

const MenuItemGroup: Component<ArkMenu.ItemGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemGroupClass = createMemo(() => styles.itemGroup({ class: local.class }));
  return <ArkMenu.ItemGroup class={itemGroupClass()} {...others} />;
};

const MenuItemGroupLabel: Component<ArkMenu.ItemGroupLabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemGroupLabelClass = createMemo(() => styles.itemGroupLabel({ class: local.class }));
  return <ArkMenu.ItemGroupLabel class={itemGroupLabelClass()} {...others} />;
};

export {
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuItemIndicator,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  menuVariants,
};
