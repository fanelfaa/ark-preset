import { tv, type VariantProps } from "tailwind-variants";

export const numberInputVariants = tv({
  slots: {
    root: "inline-flex flex-col gap-2",
    label: "text-sm font-medium text-foreground",
    control:
      "inline-flex items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    input: "flex h-8 w-20 flex-1 appearance-none text-start text-sm font-medium px-2",
    incrementTrigger:
      "flex items-center justify-center h-4 w-6 rounded-r-md text-sm hover:bg-accent not-disabled:cursor-pointer disabled:opacity-50",
    decrementTrigger:
      "flex items-center justify-center h-4 w-6 rounded-r-md text-sm hover:bg-accent not-disabled:cursor-pointer disabled:opacity-50",
    triggerGroup: "flex flex-col items-center",
    scrubber: "flex h-1 w-0 grow bg-transparent",
    valueText: "text-sm font-mono text-foreground",
  },
  variants: {
    disabled: {
      true: {
        control: "opacity-50 pointer-events-none",
        input: "opacity-50",
        incrementTrigger: "opacity-50",
        decrementTrigger: "opacity-50",
      },
    },
    invalid: {
      true: {
        control: "border-destructive focus-visible:ring-destructive",
        input: "text-destructive",
        incrementTrigger: "text-destructive",
        decrementTrigger: "text-destructive",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
  },
});

export type NumberInputVariants = VariantProps<typeof numberInputVariants>;
