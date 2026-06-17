import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionMultipleDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion multiple defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>Can I open multiple items?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. Just pass the <code>multiple</code> prop to the Accordion.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionItemTrigger>How does it work?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Each item tracks its own expanded/collapsed state independently.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionItemTrigger>Is it accessible?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. It follows the WAI-ARIA Accordion pattern.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
