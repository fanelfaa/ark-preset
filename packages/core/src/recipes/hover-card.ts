import { tv, type VariantProps } from "tailwind-variants";

export const hoverCardVariants = tv({
  slots: {
    root: "inline-flex",
    trigger:
      "inline-flex items-center justify-center gap-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    positioner: "z-50",
    content:
      "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    arrow: "[--arrow-size:10px]",
    arrowTip: "h-2 w-2 border-t border-l border-border bg-popover",
  },
});

export type HoverCardVariants = VariantProps<typeof hoverCardVariants>;
