import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "@ui/solid";

export default function AccordionCollapsibleDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion collapsible>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            Can this be collapsed?
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
            <div class="pb-4 text-sm text-foreground">
              Yes. Click the trigger again to collapse this item.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
