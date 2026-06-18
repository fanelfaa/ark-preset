import { tv, type VariantProps } from "tailwind-variants";

export const labelVariants = tv({
  base: "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {
    error: {
      true: "text-destructive",
    },
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
