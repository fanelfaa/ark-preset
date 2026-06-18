import { tv, type VariantProps } from "tailwind-variants";

export const ratingGroupVariants = tv({
  slots: {
    root: "flex items-center gap-2",
    control: "flex items-center gap-0.5",
    item: [
      "group cursor-pointer transition-colors duration-150 ease-out",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "data-[readonly]:cursor-default",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
    ],
    itemIndicator: "relative inline-flex items-center justify-center",
  },
  variants: {
    size: {
      sm: {
        item: "size-4",
      },
      md: {
        item: "size-5",
      },
      lg: {
        item: "size-6",
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row items-center gap-2",
      },
      vertical: {
        root: "flex-col items-start gap-1",
      },
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

export type RatingGroupVariants = VariantProps<typeof ratingGroupVariants>;
