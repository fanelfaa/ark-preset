import { tv, type VariantProps } from "tailwind-variants";

export const cardVariants = tv({
  slots: {
    root: "flex flex-col gap-4 rounded-xl border border-foreground/15 dark:border-foreground/20 bg-card text-card-foreground shadow-sm p-4",
    header: "flex flex-col gap-1.5",
    title: "leading-none font-semibold tracking-tight",
    description: "text-sm text-muted-foreground",
    content: "",
    footer: "flex items-center",
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
