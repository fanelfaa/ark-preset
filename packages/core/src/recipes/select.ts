import { tv, type VariantProps } from "tailwind-variants";

export const selectVariants = tv({
  slots: {
    root: "grid gap-1.5 w-full",
    control:
      "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2.5 py-1.5 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    trigger: "flex flex-1 items-center justify-start size-4 [&[data-state=open]>svg]:rotate-180",
    valueText: "text-base md:text-sm data-[placeholder-shown]:text-muted-foreground",
    indicator: "size-4 transition-transform text-muted-foreground",
    clearTrigger:
      "size-4 text-muted-foreground hover:text-foreground transition-colors pointer-events-auto",
    searchInput:
      "mx-1 mb-1.5 flex h-8 items-center rounded-md border border-input bg-background px-2.5 py-1.5 text-base md:text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
    positioner: "z-50",
    content:
      "z-50 min-w-[8rem] rounded-md border border-border bg-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    itemText: "flex-1",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
  },
  variants: {
    error: {
      true: {
        control: "border-destructive focus-within:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
