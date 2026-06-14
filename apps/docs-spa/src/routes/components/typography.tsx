import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import TypographyBasicDemo from "@demos/typography-demo/TypographyBasicDemo.tsx";
import { H1, H2, H3, P, InlineCode } from "@fan-ui/solid";
import { Pre, Table, Th, Td, THead, TBody, Tr } from "../../components/markdown";

export const Route = createFileRoute("/components/typography")({ component: TypographyPage });

function TypographyPage() {
  return (
    <>
      <H1>Typography</H1>
      <P>A collection of styled text components for headings, body text, and inline elements.</P>
      <DocsLink href="https://ui.shadcn.com/docs/components/typography" />
      <TypographyBasicDemo />
      <Pre lang="tsx">{`
import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote, List } from "~/components/typography";

export function TypographyDemo() {
  return (
    <div class="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <Lead>Lead text for introductions.</Lead>
      <P>Regular paragraph text.</P>
      <Large>Large text</Large>
      <Small>Small text</Small>
      <Muted>Muted text</Muted>
      <P>Text with <InlineCode>inline code</InlineCode>.</P>
      <Blockquote>A blockquote for emphasis.</Blockquote>
      <List>
        <li>List item</li>
      </List>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add typography
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/typography.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const typographyVariants = tv({
  slots: {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
    code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    blockquote: "mt-6 border-l-2 border-border pl-6 italic text-muted-foreground",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/typography/index.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from "solid-js";
import { typographyVariants } from "../recipes/typography";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = typographyVariants();

export const H1: Component<HTMLArkProps<"h1">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h1 class={styles.h1({ class: local.class })} {...others} />;
};

export const H2: Component<HTMLArkProps<"h2">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h2 class={styles.h2({ class: local.class })} {...others} />;
};

export const H3: Component<HTMLArkProps<"h3">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h3 class={styles.h3({ class: local.class })} {...others} />;
};

export const H4: Component<HTMLArkProps<"h4">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h4 class={styles.h4({ class: local.class })} {...others} />;
};

export const P: Component<HTMLArkProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.p({ class: local.class })} {...others} />;
};

export const Lead: Component<HTMLArkProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.lead({ class: local.class })} {...others} />;
};

export const Large: Component<HTMLArkProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.large({ class: local.class })} {...others} />;
};

export const Small: Component<HTMLArkProps<"small">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.small class={styles.small({ class: local.class })} {...others} />;
};

export const Muted: Component<HTMLArkProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.muted({ class: local.class })} {...others} />;
};

export const InlineCode: Component<HTMLArkProps<"code">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.code class={styles.code({ class: local.class })} {...others} />;
};

export const Blockquote: Component<HTMLArkProps<"blockquote">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.blockquote class={styles.blockquote({ class: local.class })} {...others} />;
};

export const List: Component<HTMLArkProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.ul class={styles.list({ class: local.class })} {...others} />;
};`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { H1, H2, P, Lead } from "@fan-ui/solid";
      `}</Pre>
      <P>Headings:</P>
      <Pre lang="tsx">{`

<H1>The Quick Brown Fox</H1>
<H2>The Quick Brown Fox</H2>
<H3>The Quick Brown Fox</H3>
<H4>The Quick Brown Fox</H4>
      `}</Pre>
      <P>Body text:</P>
      <Pre lang="tsx">{`

<P>Regular paragraph text with standard styling.</P>
<Lead>Lead paragraph for introducing content.</Lead>
<Large>Large styled text.</Large>
<Small>Small styled text.</Small>
<Muted>Muted secondary text.</Muted>
      `}</Pre>
      <P>Inline elements:</P>
      <Pre lang="tsx">{`

<P>Use <InlineCode>InlineCode</InlineCode> for inline code snippets.</P>
      `}</Pre>
      <P>Blockquote:</P>
      <Pre lang="tsx">{`

<Blockquote>"A quote for emphasis."</Blockquote>
      `}</Pre>
      <P>List:</P>
      <Pre lang="tsx">{`

<List>
  <li>First item</li>
  <li>Second item</li>
</List>
      `}</Pre>
      <H2>API Reference</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Component</Th>
            <Th>Renders As</Th>
            <Th>Description</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>H1</Td>
            <Td>
              <InlineCode>{`<h1>`}</InlineCode>
            </Td>
            <Td>Top-level heading</Td>
          </Tr>
          <Tr>
            <Td>H2</Td>
            <Td>
              <InlineCode>{`<h2>`}</InlineCode>
            </Td>
            <Td>Section heading</Td>
          </Tr>
          <Tr>
            <Td>H3</Td>
            <Td>
              <InlineCode>{`<h3>`}</InlineCode>
            </Td>
            <Td>Sub-section heading</Td>
          </Tr>
          <Tr>
            <Td>H4</Td>
            <Td>
              <InlineCode>{`<h4>`}</InlineCode>
            </Td>
            <Td>Group heading</Td>
          </Tr>
          <Tr>
            <Td>P</Td>
            <Td>
              <InlineCode>{`<p>`}</InlineCode>
            </Td>
            <Td>Paragraph text</Td>
          </Tr>
          <Tr>
            <Td>Lead</Td>
            <Td>
              <InlineCode>{`<p>`}</InlineCode>
            </Td>
            <Td>Lead/introductory text</Td>
          </Tr>
          <Tr>
            <Td>Large</Td>
            <Td>
              <InlineCode>{`<div>`}</InlineCode>
            </Td>
            <Td>Large body text</Td>
          </Tr>
          <Tr>
            <Td>Small</Td>
            <Td>
              <InlineCode>{`<small>`}</InlineCode>
            </Td>
            <Td>Small/fine print text</Td>
          </Tr>
          <Tr>
            <Td>Muted</Td>
            <Td>
              <InlineCode>{`<p>`}</InlineCode>
            </Td>
            <Td>Muted/secondary text</Td>
          </Tr>
          <Tr>
            <Td>InlineCode</Td>
            <Td>
              <InlineCode>{`<code>`}</InlineCode>
            </Td>
            <Td>Inline code snippet</Td>
          </Tr>
          <Tr>
            <Td>Blockquote</Td>
            <Td>
              <InlineCode>{`<blockquote>`}</InlineCode>
            </Td>
            <Td>Quoted content</Td>
          </Tr>
          <Tr>
            <Td>List</Td>
            <Td>
              <InlineCode>{`<ul>`}</InlineCode>
            </Td>
            <Td>Unordered list container</Td>
          </Tr>
          <Tr>
            <Td>class</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>All components accept class</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
