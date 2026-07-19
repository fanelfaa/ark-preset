import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function AccordionDisabledDemo() {
  return (
    <DemoWrapper>
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>Active Item</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">This item is interactive.</div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionItemTrigger>Disabled Item</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">This item is disabled.</div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </DemoWrapper>
  );
}
