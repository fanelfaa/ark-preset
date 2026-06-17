import { PinInput as ArkPinInput } from "@ark-ui/solid/pin-input";
import { splitProps, type Component } from "solid-js";
import { pinInputVariants } from "@ark-preset/core";

const styles = pinInputVariants();

const Root: Component<ArkPinInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkPinInput.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Control: Component<ArkPinInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const Input: Component<ArkPinInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const Label: Component<ArkPinInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Label class={styles.label({ class: local.class })} {...others} />;
};

export const PinInput = { Root, RootProvider, Control, Input, Label };
