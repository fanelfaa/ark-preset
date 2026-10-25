import { tv, type VariantProps } from "tailwind-variants";

export const spinnerVariants = tv({
  base: "inline-block animate-spin text-muted-foreground shrink-0",
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
