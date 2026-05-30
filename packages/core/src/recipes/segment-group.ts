import { tv, type VariantProps } from "tailwind-variants";

export const segmentGroupVariants = tv({
  slots: {
    root: "relative inline-flex items-center p-1 rounded-md bg-muted isolation-inline",
    label: "text-sm font-medium text-foreground",
    item: [
      "relative z-10 inline-flex items-center justify-center gap-2 px-3 py-1.5 h-full rounded-sm cursor-pointer select-none transition-colors duration-150 ease-out",
      "data-[state=checked]:text-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
    itemText: "relative z-10 text-sm font-medium",
    itemControl: "hidden",
    indicator: "absolute z-0 rounded-sm bg-background shadow-sm transition-[left,top,width,height] duration-150 ease-out w-(--width) h-(--height) left-(--left)",
  },
  variants: {
    variant: {
      solid: {
        root: "bg-muted",
        item: "text-muted-foreground data-[state=checked]:text-foreground",
      },
      outline: {
        root: "bg-transparent border border-border",
        item: "text-muted-foreground data-[state=checked]:text-foreground",
        indicator: "border border-border shadow-none",
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col items-stretch",
        item: "w-full justify-center",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
  },
});

export type SegmentGroupVariants = VariantProps<typeof segmentGroupVariants>;