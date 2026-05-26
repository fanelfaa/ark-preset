import { tv, type VariantProps } from "tailwind-variants";

export const popoverVariants = tv({
  slots: {
    root: "relative inline-flex",
    trigger: "inline-flex",
    positioner: "fixed z-50",
    content:
      "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
    arrow: "",
    arrowTip: "h-2 w-2 border-t border-l border-border bg-popover",
    indicator: "h-4 w-4",
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
