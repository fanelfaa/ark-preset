import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "@ui/solid";

export default function AccordionDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            Active Item
            <AccordionItemIndicator>
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
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">This item is interactive.</div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionItemTrigger>
            Disabled Item
            <AccordionItemIndicator>
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
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm text-foreground">This item is disabled.</div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
