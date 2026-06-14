import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import {
  H1,
  H2,
  H3,
  P,
  InlineCode,
  Blockquote,
  Pre,
  Table,
  THead,
  TBody,
  Th,
  Td,
  Tr,
} from "../../components/markdown";
import { Button } from "@fan-ui/solid";

export const Route = createFileRoute("/components/button")({ component: ButtonPage });

function ButtonPage() {
  return (
    <>
      <H1>Button</H1>
      <P>Displays a button or a component that looks like a button.</P>
      <DocsLink href="https://ark-ui.com/docs/guides/composition" />
      <div class="rounded-lg border border-border p-6">
        <div class="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <Pre lang="tsx">{`

import { Button } from "~/components/button"

export function ButtonDemo() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
      `}</Pre>
      </div>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add button
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/button.ts`:
        <Pre lang="tsx">{`import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-2.5 text-sm',
      md: 'h-9 px-3 py-1.5',
      lg: 'h-10 px-6',
      icon: 'size-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
})`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/button.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component, Show, children } from 'solid-js'
import { buttonVariants } from '../recipes/button'
import type { VariantProps } from 'tailwind-variants'
import { ark, HTMLArkProps } from '@ark-ui/solid/factory'

type ButtonProps = HTMLArkProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'loading', 'disabled', 'children'])
  const isDisabled = () => local.loading || local.disabled
  const resolvedChildren = children(() => local.children)
  return (
    <ark.button class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })} disabled={isDisabled()} {...others}>
      <Show when={local.loading}>
        <svg class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </Show>
      {resolvedChildren()}
    </ark.button>
  )
}

export { Button, buttonVariants }`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--primary</InlineCode>, <InlineCode>--destructive</InlineCode>,{" "}
        <InlineCode>--ring</InlineCode>, etc.) or override the utility classes to match your design
        system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { Button } from "~/components/button";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

<Button>Click me</Button>
      `}</Pre>
      <P>With event handler:</P>
      <Pre lang="tsx">{`

<Button onClick={() => console.log("clicked!")}>Submit</Button>
      `}</Pre>
      <P>Combining variant and size:</P>
      <Pre lang="tsx">{`

<Button variant="destructive" size="lg">
  Delete Account
</Button>
      `}</Pre>
      <P>With icon:</P>
      <Pre lang="tsx">{`

<Button variant="outline" size="icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
</Button>
      `}</Pre>
      <P>Custom class override:</P>
      <Pre lang="tsx">{`

<Button class="w-full">Full Width Button</Button>
      `}</Pre>
      <H2>Variants</H2>
      <P>
        Use the <InlineCode>variant</InlineCode> prop to change the visual style.
      </P>
      <div class="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <H2>Sizes</H2>
      <P>
        Use the <InlineCode>size</InlineCode> prop to change the button size.
      </P>
      <div class="flex flex-wrap items-center gap-4">
        <Button size="sm">Sm</Button>
        <Button size="md">Md</Button>
        <Button size="lg">Lg</Button>
        <Button size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </Button>
      </div>
      <H2>Disabled</H2>
      <P>
        Add the <InlineCode>disabled</InlineCode> prop to disable interaction.
      </P>
      <div class="flex flex-wrap gap-4">
        <Button disabled>Default</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="destructive" disabled>
          Destructive
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>
      <H2>Loading</H2>
      <P>
        Add the <InlineCode>loading</InlineCode> prop to show a spinner alongside the button label
        and automatically disable interaction.
      </P>
      <div class="flex flex-wrap gap-4">
        <Button loading>Default</Button>
        <Button variant="secondary" loading>
          Secondary
        </Button>
        <Button variant="destructive" loading>
          Destructive
        </Button>
        <Button variant="outline" loading>
          Outline
        </Button>
        <Button variant="ghost" loading>
          Ghost
        </Button>
        <Button variant="link" loading>
          Link
        </Button>
      </div>
      <P>Useful for async operations like form submissions:</P>
      <Pre lang="tsx">{`

import { createSignal } from "solid-js";
import { Button } from "~/components/button";

export function SubmitDemo() {
  const [loading, setLoading] = createSignal(false);

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  }

  return (
    <Button loading={loading()} onClick={handleSubmit}>
      Submit
    </Button>
  );
}
      `}</Pre>
      <H2>Link</H2>
      <P>
        Use the <InlineCode>buttonVariants</InlineCode> helper to render a link that looks like a
        button.
      </P>
      <Pre lang="tsx">{`

import { Button, buttonVariants } from "~/components/button";

<a class={buttonVariants({ variant: "outline" })} href="/docs">
  Click here
</a>;

// or
<Button asChild={(props)=><a {...props()}/>}>
  Click Here
</Button>
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
            <Td>size</Td>
            <Td>
              <code>"sm" | "md" | "lg" | "icon"</code>
            </Td>
            <Td>
              <code>"sm"</code>
            </Td>
          </Tr>
          <Tr>
            <Td>loading</Td>
            <Td>
              <code>boolean</code>
            </Td>
            <Td>
              <code>false</code>
            </Td>
          </Tr>
          <Tr>
            <Td>disabled</Td>
            <Td>
              <code>boolean</code>
            </Td>
            <Td>
              <code>false</code>
            </Td>
          </Tr>
          <Tr>
            <Td>class</Td>
            <Td>
              <code>string</code>
            </Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
