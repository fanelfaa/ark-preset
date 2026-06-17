import { splitProps, type Component } from "solid-js";
import { Accordion as AccordionBase } from "./accordion.base";
import type { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";

const Accordion = AccordionBase.Root;
const AccordionItem = AccordionBase.Item;

const AccordionItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <AccordionBase.ItemTrigger class={local.class} {...others}>
      {local.children}
      <AccordionBase.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </AccordionBase.ItemIndicator>
    </AccordionBase.ItemTrigger>
  );
};

const AccordionItemContent = AccordionBase.ItemContent;

export { Accordion, AccordionItem, AccordionItemTrigger, AccordionItemContent, AccordionBase };

export { accordionVariants, type AccordionVariants } from "@ark-preset/core";
