import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { splitProps, type Component } from "solid-js";
import { passwordInputVariants } from "@fan-ui/core";

const styles = passwordInputVariants();

const PasswordInputRoot: Component<ArkPasswordInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const PasswordInputRootProvider: Component<ArkPasswordInput.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const PasswordInputLabel: Component<ArkPasswordInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const PasswordInputControl: Component<ArkPasswordInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const PasswordInputField: Component<ArkPasswordInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const PasswordInputVisibilityTrigger: Component<ArkPasswordInput.VisibilityTriggerProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPasswordInput.VisibilityTrigger
      class={styles.visibilityTrigger({ class: local.class })}
      {...others}
    />
  );
};

const PasswordInputIndicator: Component<ArkPasswordInput.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPasswordInput.Indicator class={styles.indicator({ class: local.class })} {...others} />
  );
};

export const PasswordInput = {
  Root: PasswordInputRoot,
  RootProvider: PasswordInputRootProvider,
  Label: PasswordInputLabel,
  Control: PasswordInputControl,
  Field: PasswordInputField,
  VisibilityTrigger: PasswordInputVisibilityTrigger,
  Indicator: PasswordInputIndicator,
};
