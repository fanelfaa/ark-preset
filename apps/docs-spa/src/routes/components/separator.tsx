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
import SeparatorBasicDemo from "@demos/separator-demo/SeparatorBasicDemo.tsx";

export const Route = createFileRoute("/components/separator")({ component: SeparatorPage });

function SeparatorPage() {
  return (
    <>
      <H1>Separator</H1>
      <P>
        A horizontal or vertical line used to visually divide content. Commonly used in toolbars,
        forms, and lists.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/separator" />
      <SeparatorBasicDemo />
      <Pre>{`

import { Separator } from "~/components/separator";

export function SeparatorDemo() {
  return (
    <div class="space-y-2">
      <p class="text-sm">Content above the separator</p>
      <Separator />
      <p class="text-sm">Content below the separator</p>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add separator
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/separator.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const separatorVariants = tv({
  base: "shrink-0 bg-border",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export type SeparatorVariants = VariantProps<typeof separatorVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/separator.tsx`:
        <Pre>{`import { splitProps, type Component } from 'solid-js'
import { separatorVariants, type SeparatorVariants } from '../recipes/separator'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

type SeparatorProps = HTMLArkProps<"div"> & SeparatorVariants

const Separator: Component<SeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"])

  return (
    <ark.div
      class={separatorVariants({ orientation: local.orientation, class: local.class })}
      role="separator"
      aria-orientation={local.orientation ?? "horizontal"}
      {...others}
    />
  )
}

export { Separator, separatorVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { Separator } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic horizontal:</P>
      <Pre>{`

<Separator />
      `}</Pre>
      <P>Vertical:</P>
      <Pre>{`

<div class="flex h-10 items-center gap-4">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
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
            <Td>orientation</Td>
            <Td>
              <code>"horizontal" | "vertical"</code>
            </Td>
            <Td>
              <InlineCode>{"horizontal"}</InlineCode>
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
