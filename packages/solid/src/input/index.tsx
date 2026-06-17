import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { Input as InputBase } from "./input.base";
import { InputVariants } from "@ark-preset/core";

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
} & ArkField.InputProps &
  Omit<InputVariants, "error">;

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "description", "error", "children"]);
  return (
    <InputBase.Root class={local.class} invalid={!!local.error}>
      {local.label && <InputBase.Label>{local.label}</InputBase.Label>}
      <InputBase.Field error={!!local.error} {...others} />
      {local.description && !local.error && (
        <InputBase.Description>{local.description}</InputBase.Description>
      )}
      {local.error && <InputBase.ErrorText>{local.error}</InputBase.ErrorText>}
    </InputBase.Root>
  );
};

export { Input, InputBase };

export { inputVariants, type InputVariants } from "@ark-preset/core";
