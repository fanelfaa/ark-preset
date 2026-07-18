import { tv, type VariantProps } from "tailwind-variants";

export const toastVariants = tv({
  slots: {
    root: "group pointer-events-auto relative flex w-full min-w-sm max-w-sm items-center justify-between gap-x-4 overflow-hidden rounded-md border border-border p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out bg-background/40 backdrop-blur-3xl",
    title: "text-sm font-semibold",
    description: "text-sm opacity-90",
    closeTrigger:
      "absolute right-1 top-1 p-1 text-foreground/50 transition-opacity group-hover:text-foreground focus:outline-none focus:ring-2 size-5 cursor-pointer grid place-content-center rounded",
    actionTrigger:
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors group-hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring",
  },
  variants: {
    variant: {
      default: { root: "border-border" },
      loading: { root: "border-border" },
      error: {
        root: "border-red-500 text-red-950 dark:border-red-900 dark:text-red-50",
      },
      success: {
        root: "border-green-500 text-green-950 dark:border-green-900 dark:text-green-50",
      },
      info: { root: "border-border" },
      warning: {
        root: "border-yellow-500 text-yellow-950 dark:border-yellow-900 dark:text-yellow-50",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
