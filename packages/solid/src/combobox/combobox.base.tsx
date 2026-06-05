import { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { splitProps, type Component } from "solid-js";
import { comboboxVariants } from "@ui/core";

const styles = comboboxVariants();

type ComboboxRootProps = ArkCombobox.RootProps<{ label: string; value: string }> & {
  error?: boolean;
};

const Root: Component<ComboboxRootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  const localStyles = () => comboboxVariants({ error: !!local.error });
  return <ArkCombobox.Root class={localStyles().root({ class: local.class })} {...others} />;
};

type ComboboxRootProviderProps = ArkCombobox.RootProviderProps<{ label: string; value: string }>;

const RootProvider: Component<ComboboxRootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkCombobox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Label class={styles.label({ class: local.class })} {...others} />;
};

const Input: Component<ArkCombobox.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Input class={styles.input({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkCombobox.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkCombobox.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const List: Component<ArkCombobox.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.List class={styles.list({ class: local.class })} {...others} />;
};

const Item: Component<ArkCombobox.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkCombobox.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkCombobox.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCombobox.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

const Empty: Component<ArkCombobox.EmptyProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Empty class={styles.empty({ class: local.class })} {...others} />;
};

const Control: Component<ArkCombobox.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Control class={styles.control({ class: local.class })} {...others} />;
};

const ClearTrigger: Component<ArkCombobox.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCombobox.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />
  );
};

const Content: Component<ArkCombobox.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Content class={styles.content({ class: local.class })} {...others} />;
};

export const Combobox = {
  Root,
  RootProvider,
  Label,
  Input,
  Trigger,
  Positioner,
  List,
  Item,
  ItemText,
  ItemIndicator,
  Empty,
  Control,
  ClearTrigger,
  Content,
};
