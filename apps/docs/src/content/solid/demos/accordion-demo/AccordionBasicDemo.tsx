import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@ark-preset/solid";

export default function AccordionBasicDemo() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionItemTrigger>Section Title</AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Content goes here.</div>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
