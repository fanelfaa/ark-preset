import { PinInput as ArkPinInput } from "@ark-ui/solid/pin-input";
import { createMemo, splitProps, type Component } from "solid-js";
import { pinInputVariants } from "@ui/core";

const styles = pinInputVariants();

const PinInputRoot: Component<ArkPinInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkPinInput.Root class={rootClass()} {...others} />;
};

const PinInputRootProvider: Component<ArkPinInput.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkPinInput.RootProvider class={rootClass()} {...others} />;
};

const PinInputControl: Component<ArkPinInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const controlClass = createMemo(() => styles.control({ class: local.class }));
  return <ArkPinInput.Control class={controlClass()} {...others} />;
};

const PinInputInput: Component<ArkPinInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const inputClass = createMemo(() => styles.input({ class: local.class }));
  return <ArkPinInput.Input class={inputClass()} {...others} />;
};

const PinInputLabel: Component<ArkPinInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkPinInput.Label class={labelClass()} {...others} />;
};

export {
  PinInputRoot as PinInput,
  PinInputRootProvider,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  pinInputVariants,
};
