import { createSignal } from "solid-js";
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionControlledDemo() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <Accordion value={value()} onValueChange={(details) => setValue(details.value)}>
      <AccordionItem value="item-1">
        <AccordionItemTrigger>Controlled Item</AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Current state: {value().join(", ") || "closed"}</div>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
