import { tv, type VariantProps } from "tailwind-variants";

export const colorPickerVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    control: [
      "flex items-center gap-2 rounded-md border border-input bg-background transition-colors",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
      "data-[invalid]:border-destructive data-[invalid]:focus-within:ring-destructive",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    trigger: [
      "inline-flex items-center justify-center rounded-r-md transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    content: [
      "z-50 w-64 flex flex-col gap-3 rounded-lg border bg-popover p-4 shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
    ],
    area: "relative h-40 w-full overflow-hidden rounded-md",
    areaThumb:
      "absolute -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md",
    channelSlider: "relative h-3 w-full rounded-full",
    channelSliderTrack: "h-full w-full rounded-full",
    channelSliderThumb:
      "absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white shadow-md top-1/2",
    channelSliderLabel: "text-xs text-muted-foreground",
    channelInput: [
      "flex-1 min-w-0 rounded-l-md border-0 bg-transparent py-1.5 text-base md:text-sm text-center ring-offset-background transition-colors",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    valueSwatch: "h-6 w-6 overflow-hidden rounded-sm",
    eyeDropperTrigger: [
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "hover:bg-accent hover:text-accent-foreground h-7 w-7",
    ],
    formatSelect:
      "flex h-7 rounded-md border border-input bg-transparent px-1 py-1 text-xs shadow-sm",
    formatTrigger: [
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "hover:bg-accent hover:text-accent-foreground h-7 w-7",
    ],
    swatchGroup: "flex flex-wrap gap-1",
    swatch: "h-6 w-6 overflow-hidden rounded-md border cursor-pointer",
    areaBackground: "h-full w-full rounded-[inherit]",
    transparencyGrid: "h-full w-full rounded-[inherit]",
    view: "flex flex-col gap-3",
    valueText: "text-xs text-muted-foreground",
    swatchIndicator: "absolute inset-0 flex items-center justify-center",
  },
  variants: {
    size: {
      sm: { control: "h-8", trigger: "h-8 w-8 px-1.5" },
      md: { control: "h-9", trigger: "h-9 w-9 px-2" },
      lg: { control: "h-10", trigger: "h-10 w-10 px-2.5" },
    },
    inline: {
      true: { root: "relative" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>;
