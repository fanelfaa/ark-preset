import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { splitProps, type Component } from "solid-js";
import { radioGroupVariants } from "@ui/core";

const styles = radioGroupVariants();

export const RadioGroupRoot: Component<ArkRadioGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Root class={styles.root({ class: local.class })} {...others} />;
};

export const RadioGroupRootProvider: Component<ArkRadioGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const RadioGroupLabel: Component<ArkRadioGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

export const RadioGroupItem: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Item class={styles.item({ class: local.class })} {...others} />;
};

export const RadioGroupItemControl: Component<ArkRadioGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <>
      <ArkRadioGroup.ItemControl class={styles.itemControl({ class: local.class })} {...others} />
      <ArkRadioGroup.ItemHiddenInput />
    </>
  );
};

export const RadioGroupItemText: Component<ArkRadioGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

export const RadioGroupIndicator: Component<ArkRadioGroup.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkRadioGroup.Indicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};
