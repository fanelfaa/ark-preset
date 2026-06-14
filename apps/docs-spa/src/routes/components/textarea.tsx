import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import TextareaBasicDemo from "@demos/textarea-demo/TextareaBasicDemo.tsx";
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

export const Route = createFileRoute("/components/textarea")({ component: TextareaPage });

function TextareaPage() {
  return (
    <>
      <H1>Textarea</H1>
      <P>
        A multi-line text input component with support for labels, descriptions, and error states.
      </P>
      <DocsLink href="https://ui.shadcn.com/docs/components/textarea" />
      <div class="rounded-lg border border-border p-6">
        <TextareaBasicDemo />
      </div>
      <Pre lang="tsx">{`

import { Textarea } from "~/components/textarea";

export function TextareaDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Textarea placeholder="Basic textarea" />
      <Textarea label="Bio" placeholder="Tell us about yourself" />
      <Textarea
        label="With Description"
        description="Write a short introduction."
        placeholder="Enter your bio"
      />
      <Textarea label="Error State" error="This field is required" placeholder="Enter value" />
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add textarea
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/textarea.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const textareaVariants = tv({
  slots: {
    root: "grid gap-1.5",
    label: "text-sm font-medium text-foreground",
    textarea:
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
    description: "text-sm text-muted-foreground",
    error: "text-sm text-destructive",
  },
  variants: {
    error: {
      true: {
        textarea: "border-destructive focus-visible:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
})

export type TextareaVariants = VariantProps<typeof textareaVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/textarea/textarea.base.tsx`:
        <Pre lang="tsx">{`import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { textareaVariants } from "../recipes/textarea";

const styles = textareaVariants();

const TextareaRoot: Component<ArkField.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Root class={styles.root({ class: local.class })} {...others} />;
};

const TextareaLabel: Component<ArkField.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Label class={styles.label({ class: local.class })} {...others} />;
};

const TextareaField: Component<ArkField.TextareaProps & TextareaVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkField.Textarea
      class={styles.textarea({ class: local.class, error: local.error })}
      {...others}
    />
  );
};

const TextareaDescription: Component<ArkField.HelperTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.HelperText class={styles.description({ class: local.class })} {...others} />;
};

const TextareaErrorText: Component<ArkField.ErrorTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.ErrorText class={styles.error({ class: local.class })} {...others} />;
};

export const Textarea = {
  Root: TextareaRoot,
  Label: TextareaLabel,
  Field: TextareaField,
  Description: TextareaDescription,
  ErrorText: TextareaErrorText,
};`}</Pre>
        `src/components/textarea/index.tsx`:
        <Pre lang="tsx">{`import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { Textarea as TextareaBase } from "./textarea.base";
import { TextareaVariants } from "../recipes/textarea";

type TextareaProps = {
  label?: string;
  description?: string;
  error?: string;
} & ArkField.TextareaProps &
  Omit<TextareaVariants, "error">;

const Textarea: Component<TextareaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "description", "error", "children"]);
  return (
    <TextareaBase.Root class={local.class} invalid={!!local.error}>
      {local.label && <TextareaBase.Label>{local.label}</TextareaBase.Label>}
      <TextareaBase.Field error={!!local.error} {...others} />
      {local.description && !local.error && (
        <TextareaBase.Description>{local.description}</TextareaBase.Description>
      )}
      {local.error && <TextareaBase.ErrorText>{local.error}</TextareaBase.ErrorText>}
    </TextareaBase.Root>
  );
};

export { Textarea, TextareaBase };

export { textareaVariants, type TextareaVariants } from "../recipes/textarea";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { Textarea } from "@fan-ui/solid";
      `}</Pre>
      <P>Basic textarea:</P>
      <Pre lang="tsx">{`

<Textarea placeholder="Enter text..." />
      `}</Pre>
      <P>With label:</P>
      <Pre lang="tsx">{`

<Textarea label="Bio" placeholder="Tell us about yourself" />
      `}</Pre>
      <P>With description:</P>
      <Pre lang="tsx">{`

<Textarea label="Bio" description="Write a short introduction." placeholder="Enter your bio" />
      `}</Pre>
      <P>With error state:</P>
      <Pre lang="tsx">{`

<Textarea label="Bio" error="This field is required" />
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
            <Td>label</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>description</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>error</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>class</Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>(HTML textarea attrs)</Td>
            <Td>—</Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
