import { tv, type VariantProps } from "tailwind-variants";

export const progressVariants = tv({
  slots: {
    root: "relative w-full",
    track: "h-2 w-full overflow-hidden rounded-full bg-muted",
    range:
      "h-full w-full flex-1 bg-primary transition-all data-[state=indeterminate]:animate-progress-indeterminate",
    valueText: "text-base md:text-sm font-medium tabular-nums text-muted-foreground",
    view: "",
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
