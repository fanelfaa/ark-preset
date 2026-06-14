import { Combobox as ComboboxBase } from "./combobox.base";
import type { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { splitProps, type Component, type JSX } from "solid-js";

const Combobox = ComboboxBase.Root;

const ComboboxLabel = ComboboxBase.Label;

type InputTriggerProps = ArkCombobox.InputProps;

const InputTrigger: Component<InputTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ComboboxBase.Control class={local.class}>
      <ComboboxBase.Input {...others} />
      <ComboboxBase.ClearTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </ComboboxBase.ClearTrigger>
      <ComboboxBase.Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </ComboboxBase.Trigger>
    </ComboboxBase.Control>
  );
};

type ContentProps = ArkCombobox.ContentProps & {
  class?: string;
  children?: JSX.Element;
};

const Content: Component<ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <ComboboxBase.Positioner>
        <ComboboxBase.Content class={local.class} {...others}>
          <ComboboxBase.List>{local.children}</ComboboxBase.List>
        </ComboboxBase.Content>
      </ComboboxBase.Positioner>
    </Portal>
  );
};

type ItemProps = ArkCombobox.ItemProps & { class?: string; children?: JSX.Element };

const Item: Component<ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ComboboxBase.Item class={local.class} {...others}>
      <ComboboxBase.ItemText>{local.children}</ComboboxBase.ItemText>
      <ComboboxBase.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </ComboboxBase.ItemIndicator>
    </ComboboxBase.Item>
  );
};

const ComboboxRootProvider = ComboboxBase.RootProvider;

const ComboboxInputTrigger = InputTrigger;
const ComboboxContent = Content;
const ComboboxItem = Item;

export {
  Combobox,
  ComboboxLabel,
  ComboboxInputTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxRootProvider,
  ComboboxBase,
};
export { comboboxVariants, type ComboboxVariants } from "@fan-ui/core";
