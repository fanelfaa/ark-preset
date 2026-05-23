import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { createMemo, splitProps, type Component } from "solid-js";
import { radioGroupVariants } from "@ui/core";

// Global variant instance (no params)
const styles = radioGroupVariants();

const RadioGroupRoot: Component<ArkRadioGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkRadioGroup.Root class={rootClass()} {...others} />;
};

const RadioGroupLabel: Component<ArkRadioGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkRadioGroup.Label class={labelClass()} {...others} />;
};

const RadioGroupItem: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemClass = createMemo(() => styles.item({ class: local.class }));
  return <ArkRadioGroup.Item class={itemClass()} {...others} />;
};

const RadioGroupItemControl: Component<ArkRadioGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const controlClass = createMemo(() => styles.itemControl({ class: local.class }));
  return <ArkRadioGroup.ItemControl class={controlClass()} {...others} />;
};

const RadioGroupItemText: Component<ArkRadioGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const textClass = createMemo(() => styles.itemText({ class: local.class }));
  return <ArkRadioGroup.ItemText class={textClass()} {...others} />;
};

const RadioGroupItemHiddenInput: Component<ArkRadioGroup.ItemHiddenInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const inputClass = createMemo(() => styles.itemHiddenInput({ class: local.class }));
  return <ArkRadioGroup.ItemHiddenInput class={inputClass()} {...others} />;
};

const RadioGroupIndicator: Component<ArkRadioGroup.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const indicatorClass = createMemo(() => styles.itemIndicator({ class: local.class }));
  return <ArkRadioGroup.Indicator class={indicatorClass()} {...others} />;
};

export {
  RadioGroupRoot as RadioGroup,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupItemHiddenInput,
  RadioGroupIndicator,
  radioGroupVariants,
};
