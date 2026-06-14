import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import {
  H1,
  H2,
  H3,
  P,
  InlineCode,
  List,
  Pre,
  Table,
  Th,
  Td,
  A,
  THead,
  TBody,
  Tr,
} from "../../components/markdown";

import AlertDialogBasicDemo from "@demos/alert-dialog-demo/AlertDialogBasicDemo.tsx";
import AlertDialogDeleteDemo from "@demos/alert-dialog-demo/AlertDialogDeleteDemo.tsx";

export const Route = createFileRoute("/components/alert-dialog")({ component: AlertDialogPage });

function AlertDialogPage() {
  return (
    <>
      <H1>Alert Dialog</H1>
      <P>
        A modal dialog that interrupts the user with important content and expects a response.
        Typically used for confirmations and destructive actions.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/alert-dialog" />
      <AlertDialogBasicDemo />
      <Pre>{`

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/alert-dialog";
import { Button } from "~/components/button";

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={(props) => <Button {...props()} />}>
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add alert-dialog
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Install the dependencies:
        <Pre>{`npm install @ark-ui/solid tailwind-variants`}</Pre>
      </div>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/alert-dialog.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const alertDialogVariants = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    positioner: "fixed inset-0 z-50 flex items-center justify-center",
    content:
      "relative z-50 grid w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    cancel: "mt-2 sm:mt-0",
    action: "",
  },
})

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component files: At `src/components/alert-dialog/alert-dialog.base.tsx`:
        <Pre>{`import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { splitProps, type Component } from 'solid-js'
import { alertDialogVariants, buttonVariants, type ButtonVariants } from './recipes/alert-dialog'
import { HTMLProps } from '@ark-ui/solid'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const styles = alertDialogVariants()
const AlertDialog = ArkDialog.Root
const AlertDialogRootProvider = ArkDialog.RootProvider
const AlertDialogTrigger = ArkDialog.Trigger

export const AlertDialogBackdrop: Component<ArkDialog.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Backdrop class={styles.backdrop({ class: local.class })} {...others} />
}

export const AlertDialogPositioner: Component<ArkDialog.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Positioner class={styles.positioner({ class: local.class })} {...others} />
}

export const AlertDialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Content class={styles.content({ class: local.class })} {...others} />
}

export const AlertDialogCloseTrigger: Component<ArkDialog.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
}

export const AlertDialogTitle: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Title class={styles.title({ class: local.class })} {...others} />
}

export const AlertDialogDescription: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Description class={styles.description({ class: local.class })} {...others} />
}

export const AlertDialogHeader: Component<HTMLProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <div class={styles.header({ class: local.class })} {...others} />
}

export const AlertDialogFooter: Component<HTMLProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <div class={styles.footer({ class: local.class })} {...others} />
}

export const AlertDialogCancel: Component<HTMLProps<'button'> & ArkDialog.CloseTriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <ArkDialog.CloseTrigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  )
}

export const AlertDialogAction: Component<HTMLArkProps<'button'> & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <ark.button
      type="button"
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  )
}`}</Pre>
        At `src/components/alert-dialog/index.tsx`:
        <Pre>{`import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'
import { splitProps, type Component } from 'solid-js'
import {
  AlertDialogBackdrop,
  AlertDialogPositioner,
  AlertDialogCloseTrigger,
  AlertDialogContent as BaseAlertDialogContent,
} from './alert-dialog.base'

const AlertDialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <Portal>
      <AlertDialogBackdrop />
      <AlertDialogPositioner>
        <BaseAlertDialogContent class={local.class} {...others}>
          {local.children}
          <AlertDialogCloseTrigger>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </AlertDialogCloseTrigger>
        </BaseAlertDialogContent>
      </AlertDialogPositioner>
    </Portal>
  )
}

export { AlertDialogContent }
export * from './alert-dialog.base'
export { alertDialogVariants, type AlertDialogVariants } from './recipes/alert-dialog'`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@fan-ui/solid";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<AlertDialog>
  <AlertDialogTrigger asChild={(props) => <Button {...props()}>Open</Button>}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>AlertDialogBase.RootProvider</InlineCode> when you need to control the
        dialog state from outside its component tree. This pattern uses the{" "}
        <InlineCode>useDialog</InlineCode> hook from Ark UI and is useful for utility dialogs like
        delete confirmations that can be triggered from any element.
      </P>
      <AlertDialogDeleteDemo />
      <Pre>{`

import { useDialog, type UseDialogReturn } from "@ark-ui/solid/dialog";
import { AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogBase } from "~/components/alert-dialog";
import { Button } from "~/components/button";
import { type Component } from "solid-js";

interface DeleteAlertDialogProps {
  dialog: UseDialogReturn;
  title: string;
  description: string;
  onDelete: () => void;
}

const DeleteAlertDialog: Component<DeleteAlertDialogProps> = (props) => {
  return (
    <AlertDialogBase.RootProvider value={props.dialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => props.onDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogBase.RootProvider>
  );
};

export function DeleteConfirmation() {
  const dialog = useDialog({ defaultOpen: false });

  return (
    <div>
      <Button onClick={() => dialog().setOpen(true)} variant="destructive">
        Delete Account
      </Button>
      <DeleteAlertDialog
        dialog={dialog}
        title="Delete Account"
        description="This will permanently delete your account and remove your data from our servers."
        onDelete={() => dialog().setOpen(false)}
      />
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>AlertDialog</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained usage.
        </li>
        <li>
          <strong>
            <InlineCode>AlertDialogBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created context via <InlineCode>useDialog</InlineCode>. Use when you need
          to read or control the dialog state from outside the component tree. Ideal for reusable
          utility dialogs.
        </li>
      </List>
      <H2>Anatomy</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Part</Th>
            <Th>Element</Th>
            <Th>Description</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <InlineCode>AlertDialog</InlineCode>
            </Td>
            <Td>—</Td>
            <Td>
              Manages dialog state, uses <InlineCode>{`role="alertdialog"`}</InlineCode>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogTrigger</InlineCode>
            </Td>
            <Td>
              <InlineCode>button</InlineCode>
            </Td>
            <Td>The button that opens the dialog</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogContent</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The dialog panel (portal to body)</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogHeader</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>Header section for title and description</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogTitle</InlineCode>
            </Td>
            <Td>
              <InlineCode>h2</InlineCode>
            </Td>
            <Td>The dialog title</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogDescription</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>Descriptive text for the dialog</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogFooter</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>Footer section for action buttons</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogCancel</InlineCode>
            </Td>
            <Td>
              <InlineCode>button</InlineCode>
            </Td>
            <Td>Dismisses the dialog</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDialogAction</InlineCode>
            </Td>
            <Td>
              <InlineCode>button</InlineCode>
            </Td>
            <Td>Confirms the dialog action</Td>
          </Tr>
        </TBody>
      </Table>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/dialog">Ark UI Dialog</A> documentation.
      </P>
      <P>
        The <InlineCode>AlertDialog</InlineCode> automatically sets{" "}
        <InlineCode>{`role="alertdialog"`}</InlineCode> on the dialog content, providing proper
        accessibility semantics for alert dialogs.
      </P>
    </>
  );
}
