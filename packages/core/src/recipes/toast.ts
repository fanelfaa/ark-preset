import { tv, type VariantProps } from "tailwind-variants";

export const toastVariants = tv({
  slots: {
    root: "group pointer-events-auto relative flex w-full min-w-sm max-w-sm items-center justify-between gap-x-4 overflow-hidden rounded-md border border-border p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
    title: "text-sm font-semibold",
    description: "text-sm opacity-90",
    closeTrigger:
      "absolute right-1 top-1 p-1 text-foreground/50 transition-opacity group-hover:text-foreground focus:outline-none focus:ring-2 size-5 cursor-pointer grid place-content-center rounded",
    actionTrigger:
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors group-hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring",
  },
  variants: {
    variant: {
      default: { root: "bg-background border-border" },
      loading: { root: "bg-background border-border" },
      error: { root: "border-red-500 bg-red-50 text-red-950" },
      success: { root: "border-green-500 bg-green-50 text-green-950" },
      info: { root: "bg-background border-border" },
      warning: { root: "border-yellow-500 bg-yellow-50 text-yellow-950" },
    },
  },
  defaultVariants: { variant: "default" },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
