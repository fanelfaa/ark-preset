import { tv, type VariantProps } from "tailwind-variants";

export const listboxVariants = tv({
  slots: {
    root: "flex flex-col gap-1",
    content: "flex flex-col gap-0.5 rounded-md border border-border bg-background p-1 outline-none",
    item: [
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "hover:bg-muted",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary data-[state=checked]:font-medium",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
    itemText: "flex-1 text-sm",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
  },
  variants: {
    orientation: {
      vertical: {
        root: "flex-col",
        content: "flex-col",
      },
      horizontal: {
        root: "flex-row",
        content: "flex-row",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type ListboxVariants = VariantProps<typeof listboxVariants>;
