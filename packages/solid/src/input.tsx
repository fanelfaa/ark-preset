import { Field } from "@ark-ui/solid/field";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { inputVariants } from "@ui/core";

const styles = inputVariants();

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
  class?: string;
} & JSX.IntrinsicElements["input"];

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "description", "error", "class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class, error: !!local.error }));
  return (
    <Field.Root class={rootClass()} invalid={!!local.error}>
      {local.label && <Field.Label class={styles.label()}>{local.label}</Field.Label>}
      <Field.Input class={styles.input()} {...others} />
      {local.description && !local.error && (
        <Field.HelperText class={styles.description()}>{local.description}</Field.HelperText>
      )}
      <Field.ErrorText class={styles.error()}>{local.error}</Field.ErrorText>
    </Field.Root>
  );
};

export { Input, inputVariants };
