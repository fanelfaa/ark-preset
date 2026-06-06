import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { tagsInputVariants, type TagsInputVariants } from "@ui/core";

type TagsInputVariantContextValue = Pick<TagsInputVariants, "error"> & {
  disabled?: boolean;
};

const TagsInputVariantContext = createContext<TagsInputVariantContextValue>();

const useTagsInputVariant = () => useContext(TagsInputVariantContext);

const styles = tagsInputVariants();

const Root: Component<ArkTagsInput.RootProps & TagsInputVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "error", "disabled"]);
  return (
    <TagsInputVariantContext.Provider
      value={{ error: local.error, disabled: local.disabled }}
    >
      <ArkTagsInput.Root
        class={styles.root({ class: local.class, error: local.error })}
        disabled={local.disabled}
        {...others}
      />
    </TagsInputVariantContext.Provider>
  );
};

const RootProvider: Component<ArkTagsInput.RootProviderProps & TagsInputVariants> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <TagsInputVariantContext.Provider
      value={{ error: local.error }}
    >
      <ArkTagsInput.RootProvider
        class={styles.root({ class: local.class, error: local.error })}
        {...others}
      />
    </TagsInputVariantContext.Provider>
  );
};

const Label: Component<ArkTagsInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const Control: Component<ArkTagsInput.ControlProps & { error?: boolean }> = (props) => {
  const ctx = useTagsInputVariant();
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkTagsInput.Control
      class={styles.control({
        class: local.class,
        error: local.error ?? ctx?.error,
      })}
      {...others}
    />
  );
};

const Input: Component<ArkTagsInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const ClearTrigger: Component<ArkTagsInput.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />
  );
};

const Item: Component<ArkTagsInput.ItemProps & TagsInputVariants> = (props) => {
  const ctx = useTagsInputVariant();
  const [local, others] = splitProps(props, ["class", "error", "disabled"]);
  return (
    <ArkTagsInput.Item
      class={styles.item({ class: local.class })}
      disabled={local.disabled ?? ctx?.disabled}
      {...others}
    />
  );
};

const ItemPreview: Component<ArkTagsInput.ItemPreviewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ItemPreview class={styles.itemPreview({ class: local.class })} {...others} />
  );
};

const ItemText: Component<ArkTagsInput.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemInput: Component<ArkTagsInput.ItemInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.ItemInput class={styles.itemInput({ class: local.class })} {...others} />;
};

const ItemDeleteTrigger: Component<ArkTagsInput.ItemDeleteTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ItemDeleteTrigger
      class={styles.itemDeleteTrigger({ class: local.class })}
      {...others}
    />
  );
};

const Context = ArkTagsInput.Context;
const HiddenInput = ArkTagsInput.HiddenInput;

export const TagsInput = {
  Root,
  RootProvider,
  Label,
  Control,
  Input,
  ClearTrigger,
  Item,
  ItemPreview,
  ItemText,
  ItemInput,
  ItemDeleteTrigger,
  Context,
  HiddenInput,
};

export { TagsInputVariantContext, useTagsInputVariant };
