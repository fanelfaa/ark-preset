import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { InputRoot, InputLabel, InputField, InputDescription, InputErrorText } from "./input.base";
import { InputVariants } from "@ui/core";

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
} & ArkField.InputProps &
  Omit<InputVariants, "error">;

export const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "description", "error", "children"]);
  return (
    <InputRoot class={local.class} invalid={!!local.error}>
      {local.label && <InputLabel>{local.label}</InputLabel>}
      <InputField error={!!local.error} {...others} />
      {local.description && !local.error && (
        <InputDescription>{local.description}</InputDescription>
      )}
      {local.error && <InputErrorText>{local.error}</InputErrorText>}
    </InputRoot>
  );
};

export * from "./input.base";

export { inputVariants, type InputVariants } from "@ui/core";
