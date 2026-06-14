import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import DrawerBasicDemo from "@demos/drawer-demo/DrawerBasicDemo.tsx";

export const Route = createFileRoute("/components/drawer")({ component: DrawerPage });

function DrawerPage() {
  return (
    <>
      <H1>Drawer</H1>
      <P>
        A drawer panel that slides in from the left edge of the screen, used for navigation menus,
        filters, or secondary content.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/drawer" />
      <DrawerBasicDemo />
      <Pre>{`

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerGrabber,
} from "~/components/drawer";
import { Input, Separator } from "~/components/button";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>Edit Profile</DrawerTrigger>
      <DrawerContent>
        <DrawerGrabber />
        <div class="flex flex-col gap-1 px-4 pt-2 pb-4">
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. You can save your changes when done.
          </DrawerDescription>
        </div>
        <Separator />
        <div class="flex flex-col gap-4 p-4">
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="your@email.com" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add drawer
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/drawer.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const drawerVariants = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    positioner: "fixed inset-0 flex z-50",
    content:
      "relative z-50 flex flex-col w-full max-w-md bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-muted-foreground",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    grabber: "flex shrink-0 items-center justify-center cursor-grab",
    grabberIndicator: "mt-3 w-10 h-1 bg-muted-foreground/30 rounded-full",
  },
});

export type DrawerVariants = VariantProps<typeof drawerVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component files: At `src/components/drawer/drawer.base.tsx`:
        <Pre>{`import { Drawer as ArkDrawer } from '@ark-ui/solid/drawer'
import { splitProps, type Component } from 'solid-js'
import { drawerVariants } from './recipes/drawer'
import { buttonVariants, type ButtonVariants } from './recipes/button'

const styles = drawerVariants()

const Root = ArkDrawer.Root
const RootProvider = ArkDrawer.RootProvider

const Trigger: Component<ArkDrawer.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <ArkDrawer.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  )
}

const Backdrop: Component<ArkDrawer.BackdropProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Backdrop class={styles.backdrop({ class: local.class })} {...others} />
}

const Positioner: Component<ArkDrawer.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Positioner class={styles.positioner({ class: local.class })} {...others} />
}

const Content: Component<ArkDrawer.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Content class={styles.content({ class: local.class })} {...others} />
}

const CloseTrigger: Component<ArkDrawer.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
}

const Title: Component<ArkDrawer.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Title class={styles.title({ class: local.class })} {...others} />
}

const Description: Component<ArkDrawer.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Description class={styles.description({ class: local.class })} {...others} />
}

const Grabber: Component<ArkDrawer.GrabberProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.Grabber class={styles.grabber({ class: local.class })} {...others} />
}

const GrabberIndicator: Component<ArkDrawer.GrabberIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkDrawer.GrabberIndicator class={styles.grabberIndicator({ class: local.class })} {...others} />
}

const Context = ArkDrawer.Context

export const Drawer = {
  Root,
  RootProvider,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  CloseTrigger,
  Title,
  Description,
  Grabber,
  GrabberIndicator,
  Context,
}`}</Pre>
        At `src/components/drawer/index.tsx`:
        <Pre>{`import { Drawer as ArkDrawer } from '@ark-ui/solid/drawer'
import { Portal } from 'solid-js/web'
import { splitProps, type Component } from 'solid-js'
import { Drawer as DrawerBase } from './drawer.base'

const DrawerContent: Component<ArkDrawer.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <Portal>
      <DrawerBase.Backdrop />
      <DrawerBase.Positioner>
        <DrawerBase.Content class={local.class} {...others}>
          {local.children}
          <DrawerBase.CloseTrigger>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </DrawerBase.CloseTrigger>
        </DrawerBase.Content>
      </DrawerBase.Positioner>
    </Portal>
  )
}

const Drawer = DrawerBase.Root
const DrawerTrigger = DrawerBase.Trigger
const DrawerTitle = DrawerBase.Title
const DrawerDescription = DrawerBase.Description

const DrawerGrabber: Component<ArkDrawer.GrabberProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <DrawerBase.Grabber class={local.class} {...others}>
      <DrawerBase.GrabberIndicator />
    </DrawerBase.Grabber>
  )
}

export { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerGrabber, DrawerBase }
export { drawerVariants, type DrawerVariants } from './recipes/drawer'`}</Pre>
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
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "~/components/drawer";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Drawer swipeDirection="start">
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerTitle>Title</DrawerTitle>
    <DrawerDescription>Description text</DrawerDescription>
  </DrawerContent>
</Drawer>
      `}</Pre>
      <H2>With Form</H2>
      <P>Combine with form elements for profile editing, settings, or data entry.</P>
      <Pre>{`

<Drawer swipeDirection="start">
  <DrawerTrigger>Edit Profile</DrawerTrigger>
  <DrawerContent>
    <div class="flex flex-col gap-1 px-4 pt-2 pb-4">
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>Update your personal information.</DrawerDescription>
    </div>
    <div class="flex flex-col gap-4 p-4">
      <Input label="Name" placeholder="Your name" />
      <Input label="Email" type="email" placeholder="your@email.com" />
    </div>
  </DrawerContent>
</Drawer>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>DrawerBase.RootProvider</InlineCode> when you need to access the drawer
        state outside of the component tree. This pattern uses the{" "}
        <InlineCode>useDrawer</InlineCode> hook from Ark UI to create a shared context.
      </P>
      <Pre>{`

import { useDrawer } from "@ark-ui/solid/drawer";
import { DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription, DrawerBase } from "~/components/drawer";
import { Button } from "~/components/button";

export function ExternalControlExample() {
  const drawer = useDrawer({ defaultOpen: false });

  return (
    <div>
      <Button onClick={() => drawer().setOpen(true)}>Open Drawer</Button>

      <DrawerBase.RootProvider value={drawer}>
        <DrawerTrigger style="display:none">Hidden Trigger</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Externally Controlled Drawer</DrawerTitle>
          <DrawerDescription>This drawer is controlled via useDrawer.</DrawerDescription>
        </DrawerContent>
      </DrawerBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Drawer</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained usage.
        </li>
        <li>
          <strong>
            <InlineCode>DrawerBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created context via <InlineCode>useDrawer</InlineCode>. Use when you need
          to read or control the drawer state from outside the component tree.
        </li>
        <li>
          <strong>
            <InlineCode>DrawerBase.Context</InlineCode>
          </strong>{" "}
          — a render-prop component that provides access to the drawer state. Use when you need to
          read the open/close state inside the drawer tree.
        </li>
      </List>
      <P>
        Example using <InlineCode>DrawerBase.Context</InlineCode>:
      </P>
      <Pre>{`
import { Drawer, DrawerTrigger, DrawerContent, DrawerBase } from "~/components/drawer";
import { Button } from "~/components/button";

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerBase.Context>
      {(drawer) => <p>Drawer is {drawer().open ? "open" : "closed"}</p>}
    </DrawerBase.Context>
  </DrawerContent>
</Drawer>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/drawer">Ark UI Drawer</A> documentation.
      </P>
    </>
  );
}
