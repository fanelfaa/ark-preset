import { tv, type VariantProps } from "tailwind-variants";

export const pinInputVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-foreground",
    control: "inline-flex gap-2",
    input:
      "size-8 text-center text-base font-medium rounded-md border border-input bg-background outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive placeholder:text-muted-foreground",
  },
});

export type PinInputVariants = VariantProps<typeof pinInputVariants>;
