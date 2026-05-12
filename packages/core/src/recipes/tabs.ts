import { tv } from '../tv'
import type { VariantProps } from 'tailwind-variants'

export const tabsVariants = tv({
  slots: {
    root: 'w-full',
    list: 'relative inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    trigger:
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-0.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm',
    content:
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    indicator: 'absolute bottom-0 left-0 z-10 h-0.5 bg-foreground transition-[left,top,width,height] duration-200',
  },
})

export type TabsVariants = VariantProps<typeof tabsVariants>
