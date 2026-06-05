import { tv, type VariantProps } from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    root: "w-full",
    item: "border-b border-border",
    itemTrigger:
      "flex w-full items-center justify-between gap-2 py-4 text-sm font-medium text-start ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    itemIndicator:
      "size-4 shrink-0 text-foreground transition-transform duration-200 data-[state=open]:rotate-180",
    itemContent:
      "overflow-hidden transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    itemBody: "pb-4 text-sm text-foreground",
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
