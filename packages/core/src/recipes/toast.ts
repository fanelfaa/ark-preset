import { tv, type VariantProps } from "tailwind-variants";

export const toastVariants = tv({
  slots: {
    root: "group pointer-events-auto relative flex w-full min-w-sm max-w-sm items-center justify-between gap-x-4 overflow-hidden rounded-md outline-2 outline-border p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out bg-background/80 backdrop-blur-3xl",
    title: "text-sm font-semibold",
    description: "text-sm opacity-90",
    closeTrigger:
      "absolute right-1 top-1 p-1 text-foreground/50 transition-opacity group-hover:text-foreground focus:outline-none focus:ring-2 size-5 cursor-pointer grid place-content-center rounded",
    actionTrigger:
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 group-hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring",
  },
  variants: {
    variant: {
      default: { root: "outline-border" },
      loading: { root: "outline-border" },
      error: {
        root: "outline-red-500 text-red-950 dark:outline-red-900 dark:text-red-50",
      },
      success: {
        root: "outline-green-500 text-green-950 dark:outline-green-900 dark:text-green-50",
      },
      info: { root: "outline-border" },
      warning: {
        root: "outline-yellow-500 text-yellow-950 dark:outline-yellow-900 dark:text-yellow-50",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
