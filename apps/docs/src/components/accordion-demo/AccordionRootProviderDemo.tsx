import { useAccordion } from "@ark-ui/solid/accordion";
import {
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionRootProvider,
} from "@ui/solid";

export default function AccordionRootProviderDemo() {
  const accordion = useAccordion({ multiple: true, defaultValue: ["item-1"] });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(accordion().value)}
      </output>

      <AccordionRootProvider value={accordion}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
            What is this demo showing?
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
              The accordion state is managed externally via <code>useAccordion</code>. The{" "}
              <code>output</code> element above reads <code>accordion().value</code> outside the
              accordion tree.
            </div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionItemTrigger>
            Why use RootProvider?
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
              It gives you access to the accordion context anywhere — not just inside children of
              the root. Useful for external controls, toolbars, or custom UI.
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRootProvider>
    </div>
  );
}
