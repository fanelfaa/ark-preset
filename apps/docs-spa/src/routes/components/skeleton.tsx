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
import { Skeleton } from "@fan-ui/solid";
import SkeletonBasicDemo from "@demos/skeleton-demo/SkeletonBasicDemo.tsx";

export const Route = createFileRoute("/components/skeleton")({ component: SkeletonPage });

function SkeletonPage() {
  return (
    <>
      <H1>Skeleton</H1>
      <P>
        A placeholder component used to indicate loading content. Skeletons mimic the shape and
        layout of actual content while data is being fetched.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/skeleton" />
      <SkeletonBasicDemo />
      <Pre lang="tsx">{`

import { Skeleton } from "~/components/skeleton";

export function SkeletonDemo() {
  return (
    <div class="flex items-center gap-4">
      <Skeleton class="size-10 rounded-full" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-3 w-[160px]" />
      </div>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add skeleton
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/skeleton.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const skeletonVariants = tv({
  base: "animate-pulse rounded-md bg-muted",
})

export type SkeletonVariants = VariantProps<typeof skeletonVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/skeleton.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from 'solid-js'
import { skeletonVariants } from '../recipes/skeleton'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const Skeleton: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={skeletonVariants({ class: local.class })} {...others} />
}

export { Skeleton, skeletonVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { Skeleton } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic:</P>
      <Pre lang="tsx">{`

<Skeleton class="h-4 w-[250px]" />
      `}</Pre>
      <H2>Examples</H2>
      <H3>Avatar Placeholder</H3>
      <div class="rounded-lg border border-border p-6">
        <div class="flex items-center gap-4">
          <Skeleton class="size-10 rounded-full" />
          <div class="flex flex-col gap-2">
            <Skeleton class="h-4 w-[200px]" />
            <Skeleton class="h-3 w-[160px]" />
          </div>
        </div>
      </div>
      <Pre lang="tsx">{`

<div class="flex items-center gap-4">
  <Skeleton class="size-10 rounded-full" />
  <div class="flex flex-col gap-2">
    <Skeleton class="h-4 w-[200px]" />
    <Skeleton class="h-3 w-[160px]" />
  </div>
</div>
      `}</Pre>
      <H3>Card Skeleton</H3>
      <div class="rounded-lg border border-border p-6">
        <div class="flex flex-col gap-3 rounded-lg border border-border p-4">
          <Skeleton class="h-5 w-[250px]" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-[80%]" />
          <div class="flex gap-2 pt-2">
            <Skeleton class="h-8 w-20" />
            <Skeleton class="h-8 w-20" />
          </div>
        </div>
      </div>
      <Pre lang="tsx">{`

<div class="flex flex-col gap-3 rounded-lg border border-border p-4">
  <Skeleton class="h-5 w-[250px]" />
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-[80%]" />
  <div class="flex gap-2 pt-2">
    <Skeleton class="h-8 w-20" />
    <Skeleton class="h-8 w-20" />
  </div>
</div>
      `}</Pre>
      <H2>Customizing</H2>
      <P>
        The skeleton is a simple <InlineCode>{`<div>`}</InlineCode> with{" "}
        <InlineCode>animate-pulse</InlineCode> and <InlineCode>bg-muted</InlineCode> applied. Use{" "}
        <InlineCode>class</InlineCode> to control dimensions and shape:
      </P>
      <Pre lang="tsx">{`

{/* Circle for avatars */}
<Skeleton class="size-10 rounded-full" />

{/* Text line */}
<Skeleton class="h-4 w-[250px]" />

{/* Button placeholder */}
<Skeleton class="h-9 w-24 rounded-md" />

{/* Full-width card */}
<Skeleton class="h-32 w-full rounded-xl" />
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
            <Td>class</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>children</Td>
            <Td>
              <InlineCode>any</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
