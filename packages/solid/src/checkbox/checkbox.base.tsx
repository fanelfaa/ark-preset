import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { splitProps, type Component } from "solid-js";
import { checkboxVariants } from "@fan-ui/core";

const styles = checkboxVariants();

const CheckboxRoot: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Root class={styles.root({ class: local.class })} {...others} />;
};

const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const CheckboxControl: Component<ArkCheckbox.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Control class={styles.control({ class: local.class })} {...others} />;
};

const CheckboxLabel: Component<ArkCheckbox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Label class={styles.label({ class: local.class })} {...others} />;
};

const CheckboxIndicator: Component<ArkCheckbox.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const CheckboxHiddenInput = ArkCheckbox.HiddenInput;

export const Checkbox = {
  Root: CheckboxRoot,
  RootProvider: CheckboxRootProvider,
  Control: CheckboxControl,
  Label: CheckboxLabel,
  Indicator: CheckboxIndicator,
  HiddenInput: CheckboxHiddenInput,
};
