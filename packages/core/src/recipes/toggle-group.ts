import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupVariants = tv({
  slots: {
    root: "inline-flex items-center gap-1 data-[orientation=vertical]:flex-col",
    item: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-transparent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  },
  variants: {
    size: {
      sm: { item: "h-8 p-2" },
      md: { item: "h-9 p-2.5" },
      lg: { item: "h-10 p-3" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;
