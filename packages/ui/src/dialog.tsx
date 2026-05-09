import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'
import { splitProps, type Component, type JSX } from 'solid-js'
import { tv, type VariantProps } from './tv'

const dialogVariants = tv({
  slots: {
    backdrop: 'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    positioner: 'fixed inset-0 z-50 flex items-center justify-center',
    content: 'relative z-50 grid w-full max-w-lg gap-4 border border-ui-border bg-ui-background p-6 shadow-lg rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-ui-muted-foreground',
    closeTrigger: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-ui-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ui-ring focus:ring-offset-2',
  },
})

export const DialogRoot = ArkDialog.Root
export const DialogTrigger = ArkDialog.Trigger

type DialogContentProps = { class?: string; children?: JSX.Element }

const DialogContent: Component<DialogContentProps> = (props) => {
  const styles = dialogVariants()
  return (
    <Portal>
      <ArkDialog.Backdrop class={styles.backdrop()} />
      <ArkDialog.Positioner class={styles.positioner()}>
        <ArkDialog.Content class={styles.content({ class: props.class })}>
          {props.children}
          <ArkDialog.CloseTrigger class={styles.closeTrigger()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </ArkDialog.CloseTrigger>
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  )
}

const DialogHeader: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const styles = dialogVariants()
  return <div class={styles.header({ class: props.class })}>{props.children}</div>
}

const DialogFooter: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const styles = dialogVariants()
  return <div class={styles.footer({ class: props.class })}>{props.children}</div>
}

const DialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const styles = dialogVariants()
  return <ArkDialog.Title class={styles.title()} {...props} />
}

const DialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const styles = dialogVariants()
  return <ArkDialog.Description class={styles.description()} {...props} />
}

export { DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, dialogVariants }