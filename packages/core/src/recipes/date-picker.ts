import { tv, type VariantProps } from "tailwind-variants";

export const datePickerVariants = tv({
  slots: {
    root: "w-full flex flex-col gap-1.5",
    control: [
      "flex w-full items-center gap-1 h-9 flex-wrap rounded-md border border-input bg-background px-2.5 py-1.5 text-base md:text-sm ring-offset-background transition-colors",
      "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-1",
      "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
    ],
    input: [
      "flex-1 bg-transparent p-0 text-base md:text-sm ring-offset-background transition-colors w-full focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    trigger: [
      "inline-flex items-center justify-center text-muted-foreground transition-colors shrink-0",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>svg]:size-4",
    ],
    clearTrigger: [
      "inline-flex items-center justify-center text-muted-foreground transition-colors shrink-0",
      "hover:text-foreground text-sm",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    content: [
      "z-50 rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    ],
    view: "space-y-4",
    viewControl: "flex items-center justify-between gap-4",
    navTrigger: "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    viewTrigger: "h-7",
    rangeText: "text-sm font-medium",
    table: "w-full border-collapse space-y-1",
    tableRow: "mt-2 flex w-full",
    tableHeader: "w-8 flex-1 text-[0.8rem] font-normal text-muted-foreground",
    tableCell: [
      "flex-1 p-0 text-center text-sm",
      "has-[[data-range-end]]:rounded-r-md has-[[data-range-start]]:rounded-l-md",
      "has-[[data-in-range]]:bg-accent",
      "has-[[data-outside-range][data-in-range]]:bg-accent/50",
      "has-[[data-in-range]]:first-of-type:rounded-l-md has-[[data-in-range]]:last-of-type:rounded-r-md",
    ],
    tableCellTrigger: [
      "py-1 px-2 font-normal data-[selected]:opacity-100",
      "data-[today]:bg-accent data-[today]:text-accent-foreground",
      "[&:is([data-today][data-selected])]:bg-primary [&:is([data-today][data-selected])]:text-primary-foreground",
      "data-[selected]:bg-primary data-[selected]:text-primary-foreground",
      "data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground",
      "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
      "data-[outside-range]:text-muted-foreground data-[outside-range]:opacity-50",
      "[&:is([data-outside-range][data-in-range])]:bg-accent/50",
      "[&:is([data-outside-range][data-in-range])]:text-muted-foreground",
      "[&:is([data-outside-range][data-in-range])]:opacity-30",
    ],
    selectedValue: "flex flex-wrap items-center gap-1.5 flex-1 min-w-0 bg-transparent p-0 text-sm",
    selectedValuePlaceholder: "text-sm text-muted-foreground",
    selectedValueTag: [
      "inline-flex items-center gap-1 rounded-md bg-primary/10 ps-2 pe-0.5 py-0.5 text-xs font-medium text-primary",
      "data-[disabled]:opacity-50",
    ],
    selectedValueRemove: [
      "inline-flex items-center justify-center size-4 rounded-sm",
      "text-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring",
    ],
  },
  variants: {
    error: {
      true: {
        control: "border-destructive has-[:focus-visible]:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type DatePickerVariants = VariantProps<typeof datePickerVariants>;
