import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
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
    </div>
  );
}
