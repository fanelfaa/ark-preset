import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import {
  H1,
  H2,
  H3,
  P,
  InlineCode,
  Pre,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
} from "../../components/markdown";
import { Alert, AlertTitle, AlertDescription } from "@fan-ui/solid";
import AlertBasicDemo from "@demos/alert-demo/AlertBasicDemo.tsx";

export const Route = createFileRoute("/components/alert")({ component: AlertPage });

function AlertPage() {
  return (
    <>
      <H1>Alert</H1>
      <P>
        A callout that conveys important information to the user, such as system messages, warnings,
        or errors.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/alert" />
      <AlertBasicDemo />
      <Pre lang="tsx">{`

import { Alert, AlertTitle, AlertDescription, AlertAction } from "~/components/alert";

export function AlertDemo() {
  return (
    <Alert>
      <svg xmlns="..." class="size-4">{/* icon */}</svg>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add alert
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/alert.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const alertVariants = tv({
  slots: {
    root: "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    title: "mb-1 font-medium leading-none tracking-tight",
    description: "text-sm [&_p]:leading-relaxed",
    action: "",
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground",
      },
      destructive: {
        root: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AlertVariants = VariantProps<typeof alertVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/alert.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from 'solid-js'
import { alertVariants, type AlertVariants } from '../recipes/alert'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const styles = alertVariants()

type AlertProps = HTMLArkProps<"div"> & AlertVariants

const Alert: Component<AlertProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <ark.div
      role="alert"
      class={styles.root({ variant: local.variant, class: local.class })}
      {...others}
    />
  )
}

const AlertTitle: Component<HTMLArkProps<"h5">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.h5 class={styles.title({ class: local.class })} {...others} />
}

const AlertDescription: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={styles.description({ class: local.class })} {...others} />
}

export { Alert, AlertTitle, AlertDescription, alertVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { Alert, AlertTitle, AlertDescription, AlertAction } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic:</P>
      <Pre lang="tsx">{`

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
      `}</Pre>
      <P>Destructive variant:</P>
      <Pre lang="tsx">{`

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    An error occurred while processing your request.
  </AlertDescription>
</Alert>
      `}</Pre>
      <P>With icon:</P>
      <Pre lang="tsx">{`

<Alert>
  <svg xmlns="..." class="size-4">{/* icon */}</svg>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>
      `}</Pre>
      <H2>Variants</H2>
      <P>
        Use the <InlineCode>variant</InlineCode> prop to change the visual style.
      </P>
      <div class="rounded-lg border border-border p-6">
        <div class="space-y-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is the default alert style.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>This is the destructive alert style.</AlertDescription>
          </Alert>
        </div>
      </div>
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
              <InlineCode>Alert</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>
              The root container with <InlineCode>{`role="alert"`}</InlineCode>.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertTitle</InlineCode>
            </Td>
            <Td>
              <InlineCode>h5</InlineCode>
            </Td>
            <Td>The title text.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertDescription</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The description text.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>AlertAction</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>Action element, positioned within the alert.</Td>
          </Tr>
        </TBody>
      </Table>
      <H2>API Reference</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <InlineCode>variant</InlineCode>
            </Td>
            <Td>
              <code>"default" | "destructive"</code>
            </Td>
            <Td>
              <InlineCode>{`"default"`}</InlineCode>
            </Td>
            <Td>The visual style variant</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
            <Td>Additional CSS classes</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
