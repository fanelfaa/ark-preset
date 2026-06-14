import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import PinInputBasicDemo from "@demos/pin-input-demo/PinInputBasicDemo.tsx";
import PinInputRootProviderDemo from "@demos/pin-input-demo/PinInputRootProviderDemo.tsx";

export const Route = createFileRoute("/components/pin-input")({ component: PinInputPage });

function PinInputPage() {
  return (
    <>
      <H1>Pin Input</H1>
      <P>
        A pin input component for entering one-time codes, PINs, and numeric sequences with
        individual input fields.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/pin-input" />
      <PinInputBasicDemo />
      <Pre lang="tsx">{`

import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "~/components/pin-input";
import { Index } from "solid-js";

export function PinInputDemo() {
  return (
    <div class="flex flex-col gap-4">
      <PinInput>
        <PinInputLabel>Label</PinInputLabel>
        <PinInputControl>
          <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
        </PinInputControl>
      </PinInput>
      <PinInput placeholder="\\u2022" mask>
        <PinInputLabel>Masked</PinInputLabel>
        <PinInputControl>
          <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
        </PinInputControl>
      </PinInput>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add pin-input
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/pin-input.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const pinInputVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-foreground",
    control: "inline-flex gap-2",
    input:
      "size-8 text-center text-base font-medium rounded-md border border-input bg-background outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive placeholder:text-muted-foreground",
  },
});

export type PinInputVariants = VariantProps<typeof pinInputVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/pin-input/pin-input.base.tsx`:
        <Pre lang="tsx">{`import { PinInput as ArkPinInput } from "@ark-ui/solid/pin-input";
import { splitProps, type Component } from "solid-js";
import { pinInputVariants } from "../recipes/pin-input";

const styles = pinInputVariants();

const Root: Component<ArkPinInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkPinInput.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Control: Component<ArkPinInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const Input: Component<ArkPinInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const Label: Component<ArkPinInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPinInput.Label class={styles.label({ class: local.class })} {...others} />;
};

export const PinInput = { Root, RootProvider, Control, Input, Label };`}</Pre>
        `src/components/pin-input/index.tsx`:
        <Pre lang="tsx">{`import { PinInput as PinInputBase } from "./pin-input.base";

const PinInput = PinInputBase.Root;
const PinInputRootProvider = PinInputBase.RootProvider;
const PinInputControl = PinInputBase.Control;
const PinInputInput = PinInputBase.Input;
const PinInputLabel = PinInputBase.Label;

export {
  PinInput,
  PinInputRootProvider,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  PinInputBase,
};

export { pinInputVariants, type PinInputVariants } from "../recipes/pin-input";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "~/components/pin-input";
import { Index } from "solid-js";
      `}</Pre>
      <P>Basic:</P>
      <Pre lang="tsx">{`

<PinInput>
  <PinInputLabel>Code</PinInputLabel>
  <PinInputControl>
    <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
  </PinInputControl>
</PinInput>
      `}</Pre>
      <P>Masked (for sensitive codes):</P>
      <Pre lang="tsx">{`

<PinInput placeholder="•" mask>
  <PinInputLabel>PIN</PinInputLabel>
  <PinInputControl>
    <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
  </PinInputControl>
</PinInput>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>PinInputRootProvider</InlineCode> when you need to control the pin input
        state externally.
      </P>
      <PinInputRootProviderDemo />
      <Pre lang="tsx">{`

import { usePinInput } from "@ark-ui/solid/pin-input";
import {
  PinInputRootProvider,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
} from "~/components/pin-input";
import { Index } from "solid-js";

export function PinInputWithExternalControl() {
  const pinInput = usePinInput();

  return (
    <div>
      <output>Value: {JSON.stringify(pinInput().value)}</output>

      <PinInputRootProvider value={pinInput}>
        <PinInputLabel>Code</PinInputLabel>
        <PinInputControl>
          <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
        </PinInputControl>
      </PinInputRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>PinInput</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained pin inputs.
        </li>
        <li>
          <strong>
            <InlineCode>PinInputRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created pin input context via <InlineCode>usePinInput</InlineCode>. Use
          when you need to read or control the pin input state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/pin-input">Ark UI Pin Input</A>{" "}
        documentation.
      </P>
    </>
  );
}
