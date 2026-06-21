import { tv, type VariantProps } from "tailwind-variants";

export const textareaVariants = tv({
  slots: {
    root: "grid gap-1.5",
    textarea:
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
    description: "text-sm text-muted-foreground",
    error: "text-sm text-destructive",
  },
  variants: {
    error: {
      true: {
        textarea: "border-destructive focus-visible:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type TextareaVariants = VariantProps<typeof textareaVariants>;
