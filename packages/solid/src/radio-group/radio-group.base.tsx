import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { splitProps, type Component } from "solid-js";
import { radioGroupVariants, type RadioGroupVariants } from "@fan-ui/core";

const styles = radioGroupVariants();

const Root: Component<ArkRadioGroup.RootProps & RadioGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <ArkRadioGroup.Root
      class={styles.root({ class: local.class, orientation: local.orientation })}
      orientation={local.orientation}
      {...others}
    />
  );
};

const RootProvider: Component<ArkRadioGroup.RootProviderProps & RadioGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <ArkRadioGroup.RootProvider
      class={styles.root({ class: local.class, orientation: local.orientation })}
      {...others}
    />
  );
};

const Label: Component<ArkRadioGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

const Item: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemControl: Component<ArkRadioGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkRadioGroup.ItemControl class={styles.itemControl({ class: local.class })} {...others} />
  );
};

const ItemText: Component<ArkRadioGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemHiddenInput = ArkRadioGroup.ItemHiddenInput;

const Indicator: Component<ArkRadioGroup.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkRadioGroup.Indicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

export const RadioGroup = {
  Root,
  RootProvider,
  Label,
  Item,
  ItemControl,
  ItemText,
  Indicator,
  ItemHiddenInput,
};
