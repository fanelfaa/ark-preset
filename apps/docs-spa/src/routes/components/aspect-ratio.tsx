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
  Td,
  Tr,
} from "../../components/markdown";
import AspectRatioBasicDemo from "@demos/aspect-ratio-demo/AspectRatioBasicDemo.tsx";

export const Route = createFileRoute("/components/aspect-ratio")({ component: AspectRatioPage });

function AspectRatioPage() {
  return (
    <>
      <H1>Aspect Ratio</H1>
      <P>
        Displays content within a desired ratio. Useful for maintaining consistent proportions for
        images, videos, and embeds.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/aspect-ratio" />
      <AspectRatioBasicDemo />
      <Pre>{`

import { AspectRatio } from "~/components/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img src="https://images.unsplash.com/photo-..." alt="Image" class="rounded-md object-cover" />
    </AspectRatio>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add aspect-ratio
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/aspect-ratio.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const aspectRatioVariants = tv({
  base: "relative w-full",
})

export type AspectRatioVariants = VariantProps<typeof aspectRatioVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/aspect-ratio.tsx`:
        <Pre>{`import { splitProps, type Component, children } from 'solid-js'
import { aspectRatioVariants } from '../recipes/aspect-ratio'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

type AspectRatioProps = HTMLArkProps<"div"> & { ratio?: number }

const AspectRatio: Component<AspectRatioProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "ratio", "children"])
  const resolvedChildren = children(() => local.children)

  return (
    <ark.div
      class={aspectRatioVariants({ class: local.class })}
      style={{ "padding-bottom": \`\${100 / (local.ratio ?? 16 / 9)}%\` }}
      {...others}
    >
      <ark.div class="absolute inset-0" style={{ position: "absolute", inset: 0 }}>
        {resolvedChildren()}
      </ark.div>
    </ark.div>
  )
}

export { AspectRatio, aspectRatioVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { AspectRatio } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic:</P>
      <Pre>{`

<AspectRatio ratio={16 / 9}>
  <img src="https://images.unsplash.com/photo-..." alt="Image" class="rounded-md object-cover" />
</AspectRatio>
      `}</Pre>
      <P>Square:</P>
      <Pre>{`

<AspectRatio ratio={1 / 1}>
  <div class="flex items-center justify-center bg-muted rounded-md">
    Square Content
  </div>
</AspectRatio>
      `}</Pre>
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
              <InlineCode>ratio</InlineCode>
            </Td>
            <Td>
              <InlineCode>number</InlineCode>
            </Td>
            <Td>
              <InlineCode>16/9</InlineCode>
            </Td>
            <Td>The desired aspect ratio</Td>
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
