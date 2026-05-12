import { tv } from '../tv'
import type { VariantProps } from 'tailwind-variants'

export const toastVariants = tv({
  slots: {
    root: 'group pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-md border border-border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out',
    title: 'text-sm font-semibold',
    description: 'text-sm opacity-90',
    closeTrigger: 'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
    actionTrigger: 'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring',
  },
  variants: {
    variant: {
      default: { root: 'bg-background border-border' },
      destructive: {
        root: 'group border-destructive bg-destructive text-destructive-foreground',
        title: 'text-destructive-foreground',
        description: 'text-destructive-foreground/90',
        closeTrigger: 'text-destructive-foreground/50 hover:text-destructive-foreground',
        actionTrigger: 'text-destructive-foreground border-destructive-foreground/20 hover:bg-destructive-foreground/10',
      },
      success: { root: 'border-green-500 bg-green-50 text-green-950' },
      warning: { root: 'border-yellow-500 bg-yellow-50 text-yellow-950' },
    },
  },
  defaultVariants: { variant: 'default' },
})

export type ToastVariants = VariantProps<typeof toastVariants>