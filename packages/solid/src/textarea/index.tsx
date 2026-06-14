import { splitProps, type Component } from "solid-js";
import { Textarea as TextareaBase } from "./textarea.base";
import { type TextareaVariants } from "@fan-ui/core";
import { Field as ArkField } from "@ark-ui/solid/field";

type TextareaProps = {
  label?: string;
  description?: string;
  error?: string;
} & ArkField.TextareaProps &
  Omit<TextareaVariants, "error">;

const Textarea: Component<TextareaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "description", "error", "children"]);
  return (
    <TextareaBase.Root class={local.class} invalid={!!local.error}>
      {local.label && <TextareaBase.Label>{local.label}</TextareaBase.Label>}
      <TextareaBase.Field error={!!local.error} {...others} />
      {local.description && !local.error && (
        <TextareaBase.Description>{local.description}</TextareaBase.Description>
      )}
      {local.error && <TextareaBase.ErrorText>{local.error}</TextareaBase.ErrorText>}
    </TextareaBase.Root>
  );
};

export { Textarea, TextareaBase };
export { textareaVariants, type TextareaVariants } from "@fan-ui/core";
