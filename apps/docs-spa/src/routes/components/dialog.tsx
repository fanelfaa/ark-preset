import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import DialogBasicDemo from "@demos/dialog-demo/DialogBasicDemo.tsx";
import DialogRootProviderDemo from "@demos/dialog-demo/DialogRootProviderDemo.tsx";

export const Route = createFileRoute("/components/dialog")({ component: DialogPage });

function DialogPage() {
  return (
    <>
      <H1>Dialog</H1>
      <P>
        A modal dialog that overlays the page content, typically used for important actions or
        information.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/dialog" />
      <DialogBasicDemo />
      <Pre>{`

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/dialog";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { RadioGroup, RadioGroupItem, RadioGroupBase } from "~/components/radio-group";
import { Separator } from "~/components/separator";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()} />}>Edit Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. You can save your changes when done.
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-4 py-4">
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="your@email.com" />
          <RadioGroup>
            <RadioGroupBase.Label class="text-sm font-medium">Notification preferences</RadioGroupBase.Label>
            <div class="flex flex-row gap-6">
              <RadioGroupItem value="all">All notifications</RadioGroupItem>
              <RadioGroupItem value="mentions">Mentions only</RadioGroupItem>
              <RadioGroupItem value="none">No notifications</RadioGroupItem>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add dialog
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/dialog.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const dialogVariants = tv({
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
  },
});

export type DialogVariants = VariantProps<typeof dialogVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component files: At `src/components/dialog/dialog.base.tsx`:
        <Pre>{`import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { splitProps, type Component } from 'solid-js'
import { dialogVariants } from './recipes/dialog'
import { HTMLProps } from '@ark-ui/solid'

const styles = dialogVariants()

const Root = ArkDialog.Root
const RootProvider = ArkDialog.RootProvider
const Trigger = ArkDialog.Trigger

const Backdrop: Component<ArkDialog.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Backdrop class={styles.backdrop({ class: local.class })} {...others} />
}

const Positioner: Component<ArkDialog.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Positioner class={styles.positioner({ class: local.class })} {...others} />
}

const Content: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Content class={styles.content({ class: local.class })} {...others} />
}

const CloseTrigger: Component<ArkDialog.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
}

const Title: Component<ArkDialog.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Title class={styles.title({ class: local.class })} {...others} />
}

const Description: Component<ArkDialog.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDialog.Description class={styles.description({ class: local.class })} {...others} />
}

const Header: Component<HTMLProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <div class={styles.header({ class: local.class })} {...others} />
}

const Footer: Component<HTMLProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <div class={styles.footer({ class: local.class })} {...others} />
}

export const Dialog = {
  Root,
  RootProvider,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  CloseTrigger,
  Title,
  Description,
  Header,
  Footer,
}`}</Pre>
        At `src/components/dialog/index.tsx`:
        <Pre>{`import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'
import { splitProps, type Component } from 'solid-js'
import { Dialog as DialogBase } from './dialog.base'

const DialogContent: Component<ArkDialog.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <Portal>
      <DialogBase.Backdrop />
      <DialogBase.Positioner>
        <DialogBase.Content class={local.class} {...others}>
          {local.children}
          <DialogBase.CloseTrigger>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </DialogBase.CloseTrigger>
        </DialogBase.Content>
      </DialogBase.Positioner>
    </Portal>
  )
}

const Dialog = DialogBase.Root
const DialogTrigger = DialogBase.Trigger
const DialogHeader = DialogBase.Header
const DialogTitle = DialogBase.Title
const DialogDescription = DialogBase.Description
const DialogFooter = DialogBase.Footer

export { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogContent, DialogBase }
export { dialogVariants, type DialogVariants } from './recipes/dialog'`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--background</InlineCode>, <InlineCode>--foreground</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/dialog";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Dialog>
  <DialogTrigger asChild={(props) => <Button {...props()} />}>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description text</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      `}</Pre>
      <H2>With Header and Footer</H2>
      <P>Add header and footer sections for structured dialog content.</P>
      <Pre>{`

<Dialog>
  <DialogTrigger asChild={(props) => <Button {...props()} />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>Are you sure you want to proceed?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      `}</Pre>
      <H2>Controlled Open</H2>
      <P>Control the dialog open state programmatically.</P>
      <Pre>{`

import { createSignal } from "solid-js";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "~/components/dialog";

export function ControlledDialog() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open()} onOpenChange={setOpen}>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
}
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>DialogBase.RootProvider</InlineCode> when you need to access the dialog
        state outside of the component tree. This pattern uses the{" "}
        <InlineCode>useDialog</InlineCode> hook from Ark UI to create a shared context that both the
        component and external elements can reference.
      </P>
      <DialogRootProviderDemo />
      <Pre>{`

import { useDialog } from "@ark-ui/solid/dialog";
import { DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogBase } from "~/components/dialog";
import { Button } from "~/components/button";

export function ExternalControlExample() {
  const dialog = useDialog({ defaultOpen: false });

  return (
    <div>
      <output>Open: {JSON.stringify(dialog().open)}</output>

      <Button onClick={() => dialog().setOpen(true)}>Open Dialog</Button>

      <DialogBase.RootProvider value={dialog}>
        <DialogTrigger asChild={(props) => <Button {...props()} style="display:none" />}>
          Hidden Trigger
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Externally Controlled Dialog</DialogTitle>
            <DialogDescription>This dialog is controlled via useDialog.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => dialog().setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => dialog().setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </DialogBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Dialog</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained usage.
        </li>
        <li>
          <strong>
            <InlineCode>DialogBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created context via <InlineCode>useDialog</InlineCode>. Use when you need
          to read or control the dialog state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/dialog">Ark UI Dialog</A> documentation.
      </P>
    </>
  );
}
