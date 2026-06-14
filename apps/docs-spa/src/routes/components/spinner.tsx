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
  Th,
  Td,
  THead,
  TBody,
  Tr,
} from "../../components/markdown";
import SpinnerBasicDemo from "@demos/spinner-demo/SpinnerBasicDemo.tsx";

export const Route = createFileRoute("/components/spinner")({ component: SpinnerPage });

function SpinnerPage() {
  return (
    <>
      <H1>Spinner</H1>
      <P>
        An animated loading indicator used to show content is being processed. Displays an SVG-based
        spinning animation with customizable sizes.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/spinner" />
      <SpinnerBasicDemo />
      <Pre lang="tsx">{`

import { Spinner } from "~/components/spinner";

export function SpinnerDemo() {
  return (
    <div class="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add spinner
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/spinner.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const spinnerVariants = tv({
  base: "animate-spin text-muted-foreground",
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type SpinnerVariants = VariantProps<typeof spinnerVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/spinner.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from 'solid-js'
import { spinnerVariants, type SpinnerVariants } from '../recipes/spinner'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

type SpinnerProps = HTMLArkProps<"span"> & SpinnerVariants

const Spinner: Component<SpinnerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"])

  return (
    <ark.span
      class={spinnerVariants({ size: local.size, class: local.class })}
      role="status"
      aria-label="Loading"
      {...others}
    >
      <svg
        class="size-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </ark.span>
  )
}

export { Spinner, spinnerVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { Spinner } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic spinner:</P>
      <Pre lang="tsx">{`

<Spinner />
      `}</Pre>
      <P>With size:</P>
      <Pre lang="tsx">{`

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
      `}</Pre>
      <P>With text:</P>
      <Pre lang="tsx">{`

<div class="flex items-center gap-2">
  <Spinner size="sm" />
  <span class="text-sm text-muted-foreground">Loading...</span>
</div>
      `}</Pre>
      <H2>API Reference</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>size</Td>
            <Td>
              <code>"sm" | "md" | "lg" | "xl"</code>
            </Td>
            <Td>
              <InlineCode>{"md"}</InlineCode>
            </Td>
          </Tr>
          <Tr>
            <Td>class</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
