import { Toast, Toaster as ArkToaster, createToaster, type CreateToasterReturn } from '@ark-ui/solid/toast'
import { splitProps, type Component } from 'solid-js'
import { tv } from './tv'

const toastVariants = tv({
  slots: {
    root: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-ui-border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out',
    title: 'text-sm font-semibold',
    description: 'text-sm opacity-90',
    closeTrigger: 'absolute right-2 top-2 rounded-md p-1 text-ui-foreground/50 opacity-0 transition-opacity hover:text-ui-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
    actionTrigger: 'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-ui-secondary focus:outline-none focus:ring-2 focus:ring-ui-ring',
  },
  variants: {
    variant: {
      default: { root: 'bg-ui-background border-ui-border' },
      destructive: {
        root: 'destructive group border-ui-destructive bg-ui-destructive text-ui-destructive-foreground',
        title: 'text-ui-destructive-foreground',
        description: 'text-ui-destructive-foreground/90',
        closeTrigger: 'text-ui-destructive-foreground/50 hover:text-ui-destructive-foreground',
        actionTrigger: 'text-ui-destructive-foreground border-ui-destructive-foreground/20 hover:bg-ui-destructive-foreground/10',
      },
      success: { root: 'border-green-500 bg-green-50 text-green-950' },
      warning: { root: 'border-yellow-500 bg-yellow-50 text-yellow-950' },
    },
  },
  defaultVariants: { variant: 'default' },
})

type ToasterProps = {
  toaster: CreateToasterReturn
  class?: string
}

const Toaster: Component<ToasterProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return (
    <ArkToaster class={local.class} {...others}>
      {(toast) => {
        const styles = toastVariants({ variant: (toast().type as any) || 'default' })
        return (
          <Toast.Root class={styles.root()}>
            <div class="grid gap-1">
              {toast().title && <Toast.Title class={styles.title()}>{toast().title}</Toast.Title>}
              {toast().description && <Toast.Description class={styles.description()}>{toast().description}</Toast.Description>}
            </div>
            <Toast.CloseTrigger class={styles.closeTrigger()}>✕</Toast.CloseTrigger>
            {toast().action && <Toast.ActionTrigger class={styles.actionTrigger()}>{toast().action?.label}</Toast.ActionTrigger>}
          </Toast.Root>
        )
      }}
    </ArkToaster>
  )
}

export { createToaster }
export { Toaster }
export { toastVariants }