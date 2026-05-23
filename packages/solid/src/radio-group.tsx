import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { createMemo, splitProps, type Component } from "solid-js";
import { radioGroupVariants } from "@ui/core";

const styles = radioGroupVariants();

const RadioGroupRoot: Component<ArkRadioGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkRadioGroup.Root class={rootClass()} {...others}>
      {local.children}
      <ArkRadioGroup.Indicator class={styles.itemIndicator()} />
    </ArkRadioGroup.Root>
  );
};

const RadioGroupRootProvider: Component<ArkRadioGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkRadioGroup.RootProvider class={rootClass()} {...others}>
      {local.children}
      <ArkRadioGroup.Indicator class={styles.itemIndicator()} />
    </ArkRadioGroup.RootProvider>
  );
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
  return (
    <>
      <ArkRadioGroup.ItemControl class={controlClass()} {...others} />
      <ArkRadioGroup.ItemHiddenInput />
    </>
  );
};

const RadioGroupItemText: Component<ArkRadioGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const textClass = createMemo(() => styles.itemText({ class: local.class }));
  return <ArkRadioGroup.ItemText class={textClass()} {...others} />;
};

export {
  RadioGroupRoot as RadioGroup,
  RadioGroupRootProvider,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  radioGroupVariants,
};
