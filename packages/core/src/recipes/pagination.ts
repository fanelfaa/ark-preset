import { tv, type VariantProps } from "tailwind-variants";

export const paginationVariants = tv({
  slots: {
    root: "mx-auto flex w-full justify-center",
    trigger:
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 min-w-8",
    item: [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
      "h-8 min-w-8",
      "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground",
    ],
    ellipsis: "flex h-8 min-w-8 items-center justify-center text-sm",
  },
  variants: {
    size: {
      sm: {
        item: "h-7 min-w-7",
        ellipsis: "h-7 min-w-7",
      },
      md: {
        item: "h-8 min-w-8",
        ellipsis: "h-8 min-w-8",
      },
      lg: {
        item: "h-9 min-w-9",
        ellipsis: "h-9 min-w-9",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PaginationVariants = VariantProps<typeof paginationVariants>;
