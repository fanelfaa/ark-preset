import { tv, type VariantProps } from "tailwind-variants";

export const passwordInputVariants = tv({
  slots: {
    root: "grid gap-1.5 w-fit",
    label: "text-sm font-medium text-foreground",
    control: "relative",
    input:
      "flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1.5 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive",
    visibilityTrigger:
      "absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    indicator: "inline-flex items-center justify-center",
  },
  variants: {
    disabled: {
      true: {
        root: "opacity-50 cursor-not-allowed",
        visibilityTrigger: "pointer-events-none",
      },
    },
    invalid: {
      true: {
        label: "text-destructive",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
  },
});

export type PasswordInputVariants = VariantProps<typeof passwordInputVariants>;
