import { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import { splitProps, type Component } from "solid-js";
import { accordionVariants } from "@ui/core";

const styles = accordionVariants();

export const AccordionRoot: Component<ArkAccordion.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Root class={styles.root({ class: local.class })} {...others} />;
};

export const AccordionRootProvider: Component<ArkAccordion.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const AccordionItem: Component<ArkAccordion.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Item class={styles.item({ class: local.class })} {...others} />;
};

export const AccordionItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemTrigger class={styles.itemTrigger({ class: local.class })} {...others} />
  );
};

export const AccordionItemContent: Component<ArkAccordion.ItemContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemContent class={styles.itemContent({ class: local.class })} {...others} />
  );
};

export const AccordionItemIndicator: Component<ArkAccordion.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};
