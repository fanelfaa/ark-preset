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
  Pre,
  THead,
  TBody,
  Tr,
} from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import BreadcrumbBasicDemo from "@demos/breadcrumb-demo/BreadcrumbBasicDemo.tsx";

export const Route = createFileRoute("/components/breadcrumb")({ component: BreadcrumbPage });

function BreadcrumbPage() {
  return (
    <>
      <H1>Breadcrumb</H1>
      <P>
        A navigation component that displays the current page location within a hierarchy.
        Breadcrumbs help users understand where they are in the site structure and navigate back to
        parent pages.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/breadcrumb" />
      <BreadcrumbBasicDemo />
      <Pre>{`

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/breadcrumb";
import { Menu, MenuBase, MenuContent, MenuItem } from "~/components/menu";

// Basic breadcrumb
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Long path with ellipsis dropdown
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Menu>
        <MenuBase.Trigger class="flex size-8 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <BreadcrumbEllipsis />
          <span class="sr-only">Toggle menu</span>
        </MenuBase.Trigger>
        <MenuContent>
          <MenuItem value="docs">Documentation</MenuItem>
          <MenuItem value="themes">Themes</MenuItem>
          <MenuItem value="github">GitHub</MenuItem>
        </MenuContent>
      </Menu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add breadcrumb
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/breadcrumb.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const breadcrumbVariants = tv({
  slots: {
    list: "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
    item: "inline-flex items-center gap-1.5",
    link: "transition-colors hover:text-foreground",
    page: "font-normal text-foreground",
    separator: "[&>svg]:size-3.5",
    ellipsis: "flex size-9 items-center justify-center",
  },
})

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/breadcrumb/index.tsx`:
        <Pre>{`import { splitProps, type Component } from 'solid-js'
import { breadcrumbVariants } from '../recipes/breadcrumb'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const styles = breadcrumbVariants()

const Breadcrumb: Component<HTMLArkProps<"nav">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.nav aria-label="breadcrumb" class={local.class} {...others} />
}

const BreadcrumbList: Component<HTMLArkProps<"ol">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.ol class={styles.list({ class: local.class })} {...others} />
}

const BreadcrumbItem: Component<HTMLArkProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.li class={styles.item({ class: local.class })} {...others} />
}

const BreadcrumbLink: Component<HTMLArkProps<"a">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.a class={styles.link({ class: local.class })} {...others} />
}

const BreadcrumbPage: Component<HTMLArkProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.span class={styles.page({ class: local.class })} {...others} />
}

const BreadcrumbSeparator: Component<HTMLArkProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <ark.li class={styles.separator({ class: local.class })} {...others}>
      {local.children ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </ark.li>
  )
}

const BreadcrumbEllipsis: Component<HTMLArkProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <ark.span class={styles.ellipsis({ class: local.class })} {...others}>
      {local.children ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      )}
    </ark.span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
}`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@fan-ui/solid";
      `}</Pre>
      <P>Basic breadcrumb:</P>
      <Pre>{`

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      `}</Pre>
      <P>With link and current page:</P>
      <Pre>{`

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      `}</Pre>
      <P>Long path with ellipsis:</P>
      <Pre>{`

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/breadcrumb"
import { Menu, MenuBase, MenuContent, MenuItem } from "~/components/menu"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Menu>
        <MenuBase.Trigger class="flex size-8 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <BreadcrumbEllipsis />
          <span class="sr-only">Toggle menu</span>
        </MenuBase.Trigger>
        <MenuContent>
          <MenuItem value="docs">Documentation</MenuItem>
          <MenuItem value="themes">Themes</MenuItem>
          <MenuItem value="github">GitHub</MenuItem>
        </MenuContent>
      </Menu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      `}</Pre>
      <P>Custom separator:</P>
      <Pre>{`

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      `}</Pre>
      <H2>Anatomy</H2>
      <P>A breadcrumb is composed of the following parts:</P>
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
              <InlineCode>Breadcrumb</InlineCode>
            </Td>
            <Td>
              <InlineCode>nav</InlineCode>
            </Td>
            <Td>
              The root navigation container with{" "}
              <InlineCode>{`aria-label="breadcrumb"`}</InlineCode>.
            </Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbList</InlineCode>
            </Td>
            <Td>
              <InlineCode>ol</InlineCode>
            </Td>
            <Td>The ordered list of breadcrumb items.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbItem</InlineCode>
            </Td>
            <Td>
              <InlineCode>li</InlineCode>
            </Td>
            <Td>An individual breadcrumb item wrapper.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbLink</InlineCode>
            </Td>
            <Td>
              <InlineCode>a</InlineCode>
            </Td>
            <Td>A clickable breadcrumb link.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbPage</InlineCode>
            </Td>
            <Td>
              <InlineCode>span</InlineCode>
            </Td>
            <Td>The current page indicator (not a link).</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbSeparator</InlineCode>
            </Td>
            <Td>
              <InlineCode>li</InlineCode>
            </Td>
            <Td>A separator between breadcrumb items. Default: chevron right icon.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbEllipsis</InlineCode>
            </Td>
            <Td>
              <InlineCode>span</InlineCode>
            </Td>
            <Td>A collapsed items indicator. Default: ellipsis icon.</Td>
          </Tr>
        </TBody>
      </Table>
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
              <InlineCode>Breadcrumb</InlineCode>
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
              <InlineCode>BreadcrumbList</InlineCode>
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
              <InlineCode>BreadcrumbItem</InlineCode>
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
              <InlineCode>BreadcrumbLink</InlineCode>
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
              <InlineCode>BreadcrumbLink</InlineCode>
            </Td>
            <Td>
              <InlineCode>href</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbPage</InlineCode>
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
              <InlineCode>BreadcrumbSeparator</InlineCode>
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
              <InlineCode>BreadcrumbSeparator</InlineCode>
            </Td>
            <Td>
              <InlineCode>children</InlineCode>
            </Td>
            <Td>
              <InlineCode>JSX.Element</InlineCode>
            </Td>
            <Td>Chevron right icon</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>BreadcrumbEllipsis</InlineCode>
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
              <InlineCode>BreadcrumbEllipsis</InlineCode>
            </Td>
            <Td>
              <InlineCode>children</InlineCode>
            </Td>
            <Td>
              <InlineCode>JSX.Element</InlineCode>
            </Td>
            <Td>Ellipsis icon</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
