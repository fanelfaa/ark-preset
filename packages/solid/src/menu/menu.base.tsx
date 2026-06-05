import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { splitProps, type Component } from "solid-js";
import { menuVariants } from "@ui/core";

const styles = menuVariants();

// Re-exports (no style slot required)
const Root = ArkMenu.Root;
const RootProvider = ArkMenu.RootProvider;
const Trigger = ArkMenu.Trigger;
const RadioItemGroup = ArkMenu.RadioItemGroup;

// Styled wrappers
const Indicator: Component<ArkMenu.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkMenu.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Arrow: Component<ArkMenu.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkMenu.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

const Separator: Component<ArkMenu.SeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Separator class={styles.separator({ class: local.class })} {...others} />;
};

const ContextTrigger: Component<ArkMenu.ContextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkMenu.ContextTrigger class={styles.contextTrigger({ class: local.class })} {...others} />
  );
};

const TriggerItem: Component<ArkMenu.TriggerItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.TriggerItem class={styles.triggerItem({ class: local.class })} {...others} />;
};

const Content: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Content class={styles.content({ class: local.class })} {...others} />;
};

const Item: Component<ArkMenu.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkMenu.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkMenu.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />;
};

const CheckboxItem: Component<ArkMenu.CheckboxItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.CheckboxItem class={styles.checkboxItem({ class: local.class })} {...others} />;
};

const RadioItem: Component<ArkMenu.RadioItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.RadioItem class={styles.radioItem({ class: local.class })} {...others} />;
};

const ItemGroup: Component<ArkMenu.ItemGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ItemGroup class={styles.itemGroup({ class: local.class })} {...others} />;
};

const ItemGroupLabel: Component<ArkMenu.ItemGroupLabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkMenu.ItemGroupLabel class={styles.itemGroupLabel({ class: local.class })} {...others} />
  );
};

export const Menu = {
  Root,
  RootProvider,
  Trigger,
  RadioItemGroup,
  Indicator,
  Positioner,
  Arrow,
  ArrowTip,
  Separator,
  ContextTrigger,
  TriggerItem,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  CheckboxItem,
  RadioItem,
  ItemGroup,
  ItemGroupLabel,
};
