import { tv } from "tailwind-variants";

export const carouselVariants = tv({
  slots: {
    root: "flex flex-col relative w-full",
    control: "flex items-center justify-between gap-2",
    itemGroup: "flex flex-1 overflow-hidden rounded-lg",
    item: "flex-0 flex-shrink-0 min-w-0",
    prevTrigger:
      "inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent",
    nextTrigger:
      "inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent",
    indicatorGroup: "flex justify-center gap-2",
    indicator:
      "size-2.5 rounded-full bg-muted data-[current]:bg-foreground cursor-pointer transition-colors",
    autoplayTrigger:
      "inline-flex items-center justify-center size-8 rounded-full bg-background/80 hover:bg-accent",
    progressText: "text-sm font-medium font-variant-numeric tabular-nums",
  },
});

export type CarouselVariants = ReturnType<typeof carouselVariants>;
