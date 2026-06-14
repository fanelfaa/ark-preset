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
import { Badge } from "@fan-ui/solid";
import BadgeBasicDemo from "@demos/badge-demo/BadgeBasicDemo.tsx";

export const Route = createFileRoute("/components/badge")({ component: BadgePage });

function BadgePage() {
  return (
    <>
      <H1>Badge</H1>
      <P>
        A small label component used to display status, categories, or counts. Commonly used in
        tables, cards, and lists.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/badge" />
      <BadgeBasicDemo />
      <Pre>{`

import { Badge } from "~/components/badge";

export function BadgeDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add badge
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/badge.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const badgeVariants = tv({
  base: "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [a&]:cursor-pointer",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      destructive:
        "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 hover:border-destructive/30",
      outline:
        "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
      ghost:
        "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type BadgeVariants = VariantProps<typeof badgeVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/badge.tsx`:
        <Pre>{`import { splitProps, type Component } from 'solid-js'
import { badgeVariants, type BadgeVariants } from '../recipes/badge'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

type BadgeProps = HTMLArkProps<"span"> & BadgeVariants

const Badge: Component<BadgeProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <ark.span
      class={badgeVariants({ variant: local.variant, class: local.class })}
      {...others}
    />
  )
}

export { Badge, badgeVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { Badge } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic:</P>
      <Pre>{`

<Badge>Default</Badge>
      `}</Pre>
      <P>Variants:</P>
      <Pre>{`

<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
      `}</Pre>
      <P>Custom class override:</P>
      <Pre>{`

<Badge class="px-4 py-1 text-sm">Custom Size</Badge>
      `}</Pre>
      <H2>Variants</H2>
      <P>
        Use the <InlineCode>variant</InlineCode> prop to change the visual style.
      </P>
      <div class="rounded-lg border border-border p-6">
        <div class="flex flex-wrap items-center gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </div>
      </div>
      <H2>Link</H2>
      <P>
        Use <InlineCode>asChild</InlineCode> to wrap a different element, like a link, with the
        badge styling.
      </P>
      <div class="rounded-lg border border-border p-6 not-prose">
        <Badge asChild={(props) => <a {...props()} />} variant="link">
          Anchor Badge
        </Badge>
      </div>
      <Pre>{`

import { Badge } from "@fan-ui/solid";

<Badge asChild={props=> <a {...props()}/>} variant="outline">
  Anchor Badge
</Badge>
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
            <Td>variant</Td>
            <Td>
              <code>"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</code>
            </Td>
            <Td>
              <code>"default"</code>
            </Td>
          </Tr>
          <Tr>
            <Td>asChild</Td>
            <Td>
              <InlineCode>boolean</InlineCode>
            </Td>
            <Td>
              <InlineCode>false</InlineCode>
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
