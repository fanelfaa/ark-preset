import { tv, type VariantProps } from "tailwind-variants";

export const menuVariants = tv({
  slots: {
    root: "",
    indicator: "size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180",
    positioner: "z-50",
    content:
      "min-w-[10rem] p-1 bg-popover text-popover-foreground border border-neutral-200 rounded-md shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    arrow: "",
    arrowTip: "h-2 w-2 rotate-45 border-b border-l border-border bg-popover",
    item: "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    itemText: "text-sm",
    itemIndicator: "size-4 shrink-0",
    separator: "-mx-1 my-1 h-px bg-border",
    contextTrigger:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent",
    triggerItem:
      "flex items-center justify-between gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent data-[state=open]:bg-accent",
    checkboxItem:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent data-[checked]:font-medium",
    radioItem:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer data-[highlighted]:bg-accent data-[checked]:font-medium",
    itemGroup: "p-1",
    itemGroupLabel: "px-2 py-1.5 text-xs text-muted-foreground",
  },
});

export type MenuVariants = VariantProps<typeof menuVariants>;
