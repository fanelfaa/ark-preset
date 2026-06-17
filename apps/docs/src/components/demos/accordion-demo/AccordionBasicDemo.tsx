import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>Is it accessible?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionItemTrigger>Is it styled?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. It comes with default styles that match the other components' aesthetic.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionItemTrigger>Is it animated?</AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">
              Yes. It's animated by default, but you can disable it if you prefer.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
