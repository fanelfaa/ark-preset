import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [[data-icon]]:pointer-events-none [[data-icon=inline-start]]:-me-0.5 [[data-icon=inline-end]]:-ms-0.5",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-8 px-2.5 text-sm",
      md: "h-9 px-3 py-1.5",
      lg: "h-10 px-6",
      icon: "size-8",
      "icon-xs": "size-7 [&>svg]:size-4",
      "icon-sm": "size-8 [&>svg]:size-4",
      "icon-md": "size-9 [&>svg]:size-5",
      "icon-lg": "size-10 [&>svg]:size-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
