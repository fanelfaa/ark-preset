import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
  slots: {
    root: "grid gap-1.5",
    label: "text-sm font-medium text-foreground",
    input:
      "h-8 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
    description: "text-sm text-muted-foreground",
    error: "text-sm text-destructive",
  },
  variants: {
    error: {
      true: {
        input: "border-destructive focus-visible:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
