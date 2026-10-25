import { tv, type VariantProps } from "tailwind-variants";

export const drawerVariants = tv({
  slots: {
    root: "",
    trigger:
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0.5 active:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2",
    backdrop:
      "fixed inset-0 z-50 bg-black/50 dark:bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:pointer-events-none",
    positioner:
      "fixed inset-0 z-50 flex data-[state=closed]:pointer-events-none data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start data-[swipe-direction=up]:justify-center data-[swipe-direction=down]:items-end data-[swipe-direction=down]:justify-center",
    content:
      "relative z-50 flex flex-col w-full max-w-md bg-background shadow-lg p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe-direction=left]:h-full data-[swipe-direction=right]:h-full data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top data-[state=closed]:pointer-events-none",
    title: "text-lg font-semibold tracking-tight text-left",
    description: "text-sm text-muted-foreground text-left",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    grabber:
      "absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-grab w-6 h-12 z-10",
    grabberIndicator: "w-1 h-8 bg-muted-foreground/30 rounded-full",
  },
});

export type DrawerVariants = VariantProps<typeof drawerVariants>;
