import { Select as ArkSelect } from "@ark-ui/solid/select";
import { splitProps, type Component } from "solid-js";
import { selectVariants } from "@ui/core";

const styles = selectVariants();

type SelectRootProps = ArkSelect.RootProps<{ label: string; value: string }> & {
  error?: boolean;
};

const Root: Component<SelectRootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  const localStyles = () => selectVariants({ error: !!local.error });
  return <ArkSelect.Root class={localStyles().root({ class: local.class })} {...others} />;
};

type SelectRootProviderProps = ArkSelect.RootProviderProps<{ label: string; value: string }>;

const RootProvider: Component<SelectRootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkSelect.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Label class={styles.label({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkSelect.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkSelect.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkSelect.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Item: Component<ArkSelect.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkSelect.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkSelect.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSelect.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

const Control: Component<ArkSelect.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Control class={styles.control({ class: local.class })} {...others} />;
};

const ClearTrigger: Component<ArkSelect.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />;
};

const Indicator: Component<ArkSelect.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const Content: Component<ArkSelect.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Content class={styles.content({ class: local.class })} {...others} />;
};

export const Select = {
  Root,
  RootProvider,
  Label,
  Trigger,
  ValueText,
  Positioner,
  Item,
  ItemText,
  ItemIndicator,
  Control,
  Indicator,
  Content,
  ClearTrigger,
};
