import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionMultipleItemsDemo() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionItemTrigger>First Section</AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">First content.</div>
        </AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionItemTrigger>Second Section</AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Second content.</div>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
