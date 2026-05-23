import { tv, type VariantProps } from "tailwind-variants";

export const radioGroupVariants = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "text-sm font-medium text-foreground",
    item: "inline-flex items-center gap-2",
    itemControl: [
      "peer size-5 shrink-0 rounded-full border border-input ring-offset-background transition-colors disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=checked]:border-primary data-[state=checked]:border-[6px] data-[state=checked]:text-primary-foreground",
    ],
    itemIndicator: "size-2 rounded-full hidden",
    itemText: "text-sm font-medium text-foreground",
    itemHiddenInput: "absolute opacity-0 w-0 h-0 pointer-events-none",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;
