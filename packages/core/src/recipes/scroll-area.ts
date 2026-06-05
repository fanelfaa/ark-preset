import { tv, type VariantProps } from "tailwind-variants";

export const scrollAreaVariants = tv({
  slots: {
    viewport:
      "h-full w-full rounded-[inherit] overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:size-0",
    scrollbar: "flex select-none touch-none transition-colors group",
    thumb:
      "relative flex-1 rounded-full bg-border/40 transition-colors duration-150 group-hover:bg-border data-[dragging]:bg-border",
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
