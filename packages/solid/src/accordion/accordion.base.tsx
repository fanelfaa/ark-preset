import { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import { splitProps, type Component } from "solid-js";
import { accordionVariants } from "@ark-preset/core";

const styles = accordionVariants();

const Root: Component<ArkAccordion.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkAccordion.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Item: Component<ArkAccordion.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemTrigger class={styles.itemTrigger({ class: local.class })} {...others} />
  );
};

const ItemContent: Component<ArkAccordion.ItemContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemContent class={styles.itemContent({ class: local.class })} {...others} />
  );
};

const ItemIndicator: Component<ArkAccordion.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

export const Accordion = { Root, RootProvider, Item, ItemTrigger, ItemContent, ItemIndicator };
