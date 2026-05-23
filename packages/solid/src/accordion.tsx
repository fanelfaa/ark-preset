import { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import { createMemo, splitProps, type Component } from "solid-js";
import { accordionVariants } from "@ui/core";

const styles = accordionVariants();

const AccordionRoot: Component<ArkAccordion.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkAccordion.Root class={rootClass()} {...others} />;
};

const AccordionRootProvider: Component<ArkAccordion.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkAccordion.RootProvider class={rootClass()} {...others} />;
};

const AccordionItem: Component<ArkAccordion.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const itemClass = createMemo(() => styles.item({ class: local.class }));
  return <ArkAccordion.Item class={itemClass()} {...others} />;
};

const AccordionItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const triggerClass = createMemo(() => styles.itemTrigger({ class: local.class }));
  return <ArkAccordion.ItemTrigger class={triggerClass()} {...others} />;
};

const AccordionItemContent: Component<ArkAccordion.ItemContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const contentClass = createMemo(() => styles.itemContent({ class: local.class }));
  return <ArkAccordion.ItemContent class={contentClass()} {...others} />;
};

const AccordionItemIndicator: Component<ArkAccordion.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const indicatorClass = createMemo(() => styles.itemIndicator({ class: local.class }));
  return <ArkAccordion.ItemIndicator class={indicatorClass()} {...others} />;
};

export {
  AccordionRoot as Accordion,
  AccordionRootProvider,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
  accordionVariants,
};
