import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import InputBasicDemo from "@demos/input-demo/InputBasicDemo.tsx";

import { H1, H2, H3, P, Pre, Table, Th, Td, THead, TBody, Tr } from "../../components/markdown";

export const Route = createFileRoute("/components/input")({ component: InputPage });

function InputPage() {
  return (
    <>
      <H1>Input</H1>
      <P>A text input component with support for labels, descriptions, and error states.</P>
      <DocsLink href="https://ark-ui.com/docs/components/field" />
      <div class="rounded-lg border border-border p-6">
        <InputBasicDemo />
        <Pre lang="tsx">{`import { Input } from "~/components/input"

export function InputDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Input placeholder="Basic input" />
      <Input label="Email" placeholder="Enter your email" />
      <Input label="With Description" description="We'll never share your email." placeholder="email@example.com" />
      <Input label="Error State" error="This field is required" placeholder="Enter value" />
    </div>
  )
}`}</Pre>
      </div>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add input
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/input.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const inputVariants = tv({
  slots: {
    root: "grid gap-1.5",
    label: "text-sm font-medium text-foreground",
    input:
      "flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    description: "text-sm text-muted-foreground",
    error: "text-sm text-destructive",
  },
  variants: {
    error: {
      true: {
        input: "border-destructive focus-visible:ring-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/input/input.base.tsx`:
        <Pre lang="tsx">{`import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { inputVariants } from "../recipes/input";

const styles = inputVariants();

const InputRoot: Component<ArkField.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Root class={styles.root({ class: local.class })} {...others} />;
};

const InputLabel: Component<ArkField.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.Label class={styles.label({ class: local.class })} {...others} />;
};

const InputField: Component<ArkField.InputProps & { error?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkField.Input
      class={styles.input({ class: local.class, error: local.error })}
      {...others}
    />
  );
};

const InputDescription: Component<ArkField.HelperTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.HelperText class={styles.description({ class: local.class })} {...others} />;
};

const InputErrorText: Component<ArkField.ErrorTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkField.ErrorText class={styles.error({ class: local.class })} {...others} />;
};

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  Description: InputDescription,
  ErrorText: InputErrorText,
};`}</Pre>
        `src/components/input/index.tsx`:
        <Pre lang="tsx">{`import { Field as ArkField } from "@ark-ui/solid/field";
import { splitProps, type Component } from "solid-js";
import { Input as InputBase } from "./input.base";
import { type InputVariants } from "../recipes/input";

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
} & ArkField.InputProps &
  Omit<InputVariants, "error">;

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "label",
    "description",
    "error",
  ]);
  return (
    <InputBase.Root class={local.class} invalid={!!local.error}>
      {local.label && <InputBase.Label>{local.label}</InputBase.Label>}
      <InputBase.Field error={!!local.error} {...others} />
      {local.description && !local.error && (
        <InputBase.Description>{local.description}</InputBase.Description>
      )}
      {local.error && <InputBase.ErrorText>{local.error}</InputBase.ErrorText>}
    </InputBase.Root>
  );
};

export { Input, InputBase };

export { inputVariants, type InputVariants } from "../recipes/input";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre lang="tsx">{`

import { Input } from "~/components/input";
      `}</Pre>
      <P>Basic input:</P>
      <Pre lang="tsx">{`

<Input placeholder="Enter text..." />
      `}</Pre>
      <P>With label:</P>
      <Pre lang="tsx">{`

<Input label="Username" placeholder="Enter username" />
      `}</Pre>
      <P>With description:</P>
      <Pre lang="tsx">{`

<Input label="Email" description="We'll never share your email." placeholder="email@example.com" />
      `}</Pre>
      <P>With error state:</P>
      <Pre lang="tsx">{`

<Input label="Password" error="Password is required" type="password" />
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
            <Td>string</Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>description</Td>
            <Td>string</Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>error</Td>
            <Td>string</Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>class</Td>
            <Td>string</Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>(HTML input attrs)</Td>
            <Td>—</Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
