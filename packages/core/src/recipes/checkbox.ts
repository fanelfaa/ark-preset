import { tv, type VariantProps } from "tailwind-variants";

export const checkboxVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
    control:
      "peer size-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
    indicator: "flex items-center justify-center text-current",
    label: "text-sm font-medium text-foreground leading-none",
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
