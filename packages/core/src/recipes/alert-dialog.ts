import { tv, type VariantProps } from "tailwind-variants";

export const alertDialogVariants = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-background/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:duration-200",
    positioner: "fixed inset-0 z-50 flex items-center justify-center",
    content:
      "relative z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-4 shadow-lg rounded-2xl mx-2 sm:mx-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-300 data-[state=closed]:duration-200",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    footer:
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 bg-muted/50 p-4 -mx-4 -mb-4 rounded-b-2xl border-t border-border",
    title: "text-lg font-semibold tracking-tight",
    description: "text-sm text-muted-foreground",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-1",
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;
