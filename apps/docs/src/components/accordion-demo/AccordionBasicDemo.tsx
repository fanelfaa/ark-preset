import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
} from "@ui/solid";

export default function AccordionBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            Is it accessible?
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
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionItemTrigger>
            Is it styled?
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
              Yes. It comes with default styles that match the other components' aesthetic.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionItemTrigger>
            Is it animated?
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
              Yes. It's animated by default, but you can disable it if you prefer.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
