import { tv, type VariantProps } from "tailwind-variants";

export const alertVariants = tv({
  slots: {
    root: "relative w-full rounded-lg border border-border p-2.5 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-2.5 [&>svg]:top-2.5 [&>svg]:text-foreground [&>svg~*]:pl-7",
    title: "mb-1 font-medium leading-none tracking-tight",
    description: "text-sm text-muted-foreground [&_p]:leading-relaxed",
    action: "",
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground",
      },
      destructive: {
        root: "border-destructive text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
