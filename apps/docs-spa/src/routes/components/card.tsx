import { createFileRoute } from "@tanstack/solid-router";
import {
  H1,
  H2,
  H3,
  P,
  InlineCode,
  Table,
  Th,
  Td,
  THead,
  TBody,
  Tr,
  Pre,
} from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import CardBasicDemo from "@demos/card-demo/CardBasicDemo.tsx";

export const Route = createFileRoute("/components/card")({ component: CardPage });

function CardPage() {
  return (
    <>
      <H1>Card</H1>
      <P>
        A flexible container component used to group related content and actions. Cards provide a
        structured layout with distinct sections for headers, content, and actions.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/card" />
      <CardBasicDemo />
      <Pre lang="tsx">{`

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/card";
import { Button } from "~/components/button";

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">
          Your project will be deployed to a global network of servers
          and available within minutes.
        </p>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Button>Deploy</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add card
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/card.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const cardVariants = tv({
  slots: {
    root: "flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow-sm p-4",
    header: "flex flex-col gap-1.5",
    title: "leading-none font-semibold tracking-tight",
    description: "text-sm text-muted-foreground",
    content: "",
    footer: "flex items-center",
  },
})

export type CardVariants = VariantProps<typeof cardVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/card.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from 'solid-js'
import { cardVariants, type CardVariants } from '../recipes/card'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const styles = cardVariants()

const Card: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={styles.root({ class: local.class })} {...others} />
}

const CardHeader: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={styles.header({ class: local.class })} {...others} />
}

const CardTitle: Component<HTMLArkProps<"h3">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.h3 class={styles.title({ class: local.class })} {...others} />
}

const CardDescription: Component<HTMLArkProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.p class={styles.description({ class: local.class })} {...others} />
}

const CardContent: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={styles.content({ class: local.class })} {...others} />
}

const CardFooter: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.div class={styles.footer({ class: local.class })} {...others} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic card:</P>
      <Pre lang="tsx">{`

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <p>Footer</p>
  </CardFooter>
</Card>
      `}</Pre>
      <H2>Anatomy</H2>
      <P>A card is composed of the following parts:</P>
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
              <InlineCode>Card</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The root container.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardHeader</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The header section, typically contains the title and description.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardTitle</InlineCode>
            </Td>
            <Td>
              <InlineCode>h3</InlineCode>
            </Td>
            <Td>The title text.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardDescription</InlineCode>
            </Td>
            <Td>
              <InlineCode>p</InlineCode>
            </Td>
            <Td>The description text, styled as muted foreground.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardContent</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The main content area.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardFooter</InlineCode>
            </Td>
            <Td>
              <InlineCode>div</InlineCode>
            </Td>
            <Td>The footer section, typically used for actions.</Td>
          </Tr>
        </TBody>
      </Table>
      <H2>Examples</H2>
      <Pre lang="tsx">{`

<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <a href="#">View all</a>
  </CardFooter>
</Card>
      `}</Pre>
      <H2>API Reference</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Component</Th>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <InlineCode>Card</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardHeader</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardTitle</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardDescription</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardContent</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>CardFooter</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
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
