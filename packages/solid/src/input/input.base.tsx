import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { inputVariants, type InputVariants } from "@ark-preset/core";

const styles = inputVariants();

const InputRoot: Component<ArkField.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Root class={styles.root({ class: local.class })} {...others} />;
};

const InputLabel: Component<ArkField.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Label class={styles.label({ class: local.class })} {...others} />;
};

const InputField: Component<ArkField.InputProps & InputVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkField.Input class={styles.input({ class: local.class, error: local.error })} {...others} />
  );
};

const InputDescription: Component<ArkField.HelperTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.HelperText class={styles.description({ class: local.class })} {...others} />;
};

const InputErrorText: Component<ArkField.ErrorTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.ErrorText class={styles.error({ class: local.class })} {...others} />;
};

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  Description: InputDescription,
  ErrorText: InputErrorText,
};
