import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { textareaVariants, type TextareaVariants } from "@fan-ui/core";

const styles = textareaVariants();

const TextareaRoot: Component<ArkField.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Root class={styles.root({ class: local.class })} {...others} />;
};

const TextareaLabel: Component<ArkField.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Label class={styles.label({ class: local.class })} {...others} />;
};

const TextareaField: Component<ArkField.TextareaProps & TextareaVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkField.Textarea
      class={styles.textarea({ class: local.class, error: local.error })}
      {...others}
    />
  );
};

const TextareaDescription: Component<ArkField.HelperTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.HelperText class={styles.description({ class: local.class })} {...others} />;
};

const TextareaErrorText: Component<ArkField.ErrorTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.ErrorText class={styles.error({ class: local.class })} {...others} />;
};

export const Textarea = {
  Root: TextareaRoot,
  Label: TextareaLabel,
  Field: TextareaField,
  Description: TextareaDescription,
  ErrorText: TextareaErrorText,
};
