import { tv, type VariantProps } from "tailwind-variants";

export const collapsibleVariants = tv({
  slots: {
    root: "w-full",
    trigger:
      "flex items-center justify-between gap-3 w-full p-2.5 text-sm font-medium border border-neutral-200 rounded-lg bg-transparent cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
    content:
      "overflow-hidden data-enter:animate-collapsible-down data-end:animate-collapsible-up duration-500",
    indicator: "size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90",
  },
});

export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;
