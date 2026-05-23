import { tv, type VariantProps } from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full",
    label: "text-sm font-medium text-foreground",
    valueText: "text-sm font-medium",
    control: "relative flex items-center w-full h-5",
    track: "h-1.5 w-full rounded-full bg-muted overflow-hidden",
    range: "h-full rounded-full bg-primary",
    thumb:
      "size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    draggingIndicator: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    markerGroup: "flex justify-between w-full px-0.5",
    marker: "text-xs text-muted-foreground",
    hiddenInput: "sr-only",
  },
  variants: {
    disabled: {
      true: {
        thumb: "disabled:pointer-events-none disabled:opacity-50",
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
