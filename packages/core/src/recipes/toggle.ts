import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  slots: {
    root: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-transparent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    indicator: "inline-flex items-center justify-center",
  },
  variants: {
    size: {
      sm: { root: "h-8 px-2.5" },
      md: { root: "h-9 px-3 py-1.5" },
      lg: { root: "h-10 px-6" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ToggleVariants = VariantProps<typeof toggleVariants>;
