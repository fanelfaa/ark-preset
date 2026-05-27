import { tv, type VariantProps } from "tailwind-variants";

export const aspectRatioVariants = tv({
  base: "relative w-full",
});

export type AspectRatioVariants = VariantProps<typeof aspectRatioVariants>;
