import { tv, type VariantProps } from "tailwind-variants";

export const comboboxVariants = tv({
  slots: {
    root: "grid gap-1.5 w-full",
    label: "text-sm font-medium text-foreground",
    control:
      "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2.5 py-1 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    input:
      "flex flex-1 items-center justify-start bg-transparent text-sm placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
    trigger:
      "flex size-4 items-center justify-center text-muted-foreground [&[data-state=open]>svg]:rotate-180",
    clearTrigger:
      "flex size-4 items-center justify-center text-muted-foreground hover:text-foreground",
    positioner: "z-50",
    content:
      "z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-md border border-border bg-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    list: "space-y-1",
    item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    itemText: "flex-1",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
    empty: "py-2 text-center text-sm text-muted-foreground",
  },
  variants: {
    error: {
      true: {
        control: "border-destructive focus-within:ring-destructive",
        label: "text-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type ComboboxVariants = VariantProps<typeof comboboxVariants>;
