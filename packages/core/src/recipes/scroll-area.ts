import { tv, type VariantProps } from "tailwind-variants";

export const scrollAreaVariants = tv({
  slots: {
    root: "relative flex flex-col",
    viewport:
      "flex-1 min-h-0 w-full rounded-[inherit] overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:size-0",
    scrollbar:
      "flex select-none touch-none transition-colors group [&[data-orientation=vertical]:not([data-overflow-y])]:hidden [&[data-orientation=horizontal]:not([data-overflow-x])]:hidden",
    thumb:
      "relative flex-1 rounded-full bg-border transition-colors duration-150 group-hover:bg-muted-foreground/40 data-[dragging]:bg-muted-foreground/50",
    corner: "bg-background",
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "w-2.5 border-l border-l-transparent p-px",
        thumb: "",
      },
      horizontal: {
        scrollbar: "flex-col h-2.5 border-t border-t-transparent p-px",
        thumb: "",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type ScrollAreaVariants = VariantProps<typeof scrollAreaVariants>;
