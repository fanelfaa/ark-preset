import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import NumberInputBasicDemo from "@demos/number-input-demo/NumberInputBasicDemo.tsx";

export const Route = createFileRoute("/components/number-input")({ component: NumberInputPage });

function NumberInputPage() {
  return (
    <>
      <H1>Number Input</H1>
      <P>
        An input component for entering numeric values, with built-in increment and decrement
        buttons.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/number-input" />
      <NumberInputBasicDemo />
      <Pre>{`

import { NumberInput } from "~/components/number-input";

export function NumberInputDemo() {
  return <NumberInput defaultValue={50} min={0} max={100} />;
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add number-input
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/number-input.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const numberInputVariants = tv({
  slots: {
    root: "inline-flex flex-col gap-2",
    label: "text-sm font-medium text-foreground",
    control:
      "inline-flex items-center rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    input: "flex h-8 w-20 flex-1 appearance-none text-start text-sm font-medium px-2",
    incrementTrigger:
      "flex items-center justify-center h-4 w-6 rounded-r-md text-sm hover:bg-accent not-disabled:cursor-pointer disabled:opacity-50",
    decrementTrigger:
      "flex items-center justify-center h-4 w-6 rounded-r-md text-sm hover:bg-accent not-disabled:cursor-pointer disabled:opacity-50",
    triggerGroup: "flex flex-col items-center",
    scrubber: "flex h-1 w-0 grow bg-transparent",
    valueText: "text-sm font-mono text-foreground",
  },
  variants: {
    disabled: {
      true: {
        control: "opacity-50 pointer-events-none",
        input: "opacity-50",
        incrementTrigger: "opacity-50",
        decrementTrigger: "opacity-50",
      },
    },
    invalid: {
      true: {
        control: "border-destructive focus-visible:ring-destructive",
        input: "text-destructive",
        incrementTrigger: "text-destructive",
        decrementTrigger: "text-destructive",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
  },
});

export type NumberInputVariants = VariantProps<typeof numberInputVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files:
        `src/components/number-input/number-input.base.tsx`:
        <Pre>{`import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { splitProps, type Component } from "solid-js";
import { numberInputVariants } from "../recipes/number-input";
import { HTMLProps } from "@ark-ui/solid";

const styles = numberInputVariants();

const NumberInputRoot: Component<ArkNumberInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const NumberInputLabel: Component<ArkNumberInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const NumberInputControl: Component<ArkNumberInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const NumberInputInput: Component<ArkNumberInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const NumberInputIncrementTrigger: Component<ArkNumberInput.IncrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkNumberInput.IncrementTrigger
      class={styles.incrementTrigger({ class: local.class })}
      {...others}
    />
  );
};

const NumberInputDecrementTrigger: Component<ArkNumberInput.DecrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkNumberInput.DecrementTrigger
      class={styles.decrementTrigger({ class: local.class })}
      {...others}
    />
  );
};

const NumberInputScrubber: Component<ArkNumberInput.ScrubberProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Scrubber class={styles.scrubber({ class: local.class })} {...others} />;
};

const NumberInputTriggerGroup: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.triggerGroup({ class: local.class })} {...others} />;
};

const NumberInputValueText: Component<ArkNumberInput.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

export const NumberInput = {
  Root: NumberInputRoot,
  Label: NumberInputLabel,
  Control: NumberInputControl,
  Input: NumberInputInput,
  IncrementTrigger: NumberInputIncrementTrigger,
  DecrementTrigger: NumberInputDecrementTrigger,
  Scrubber: NumberInputScrubber,
  TriggerGroup: NumberInputTriggerGroup,
  ValueText: NumberInputValueText,
};`}</Pre>
        `src/components/number-input/index.tsx`:
        <Pre>{`import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { splitProps, type Component } from "solid-js";
import { NumberInput as NumberInputBase } from "./number-input.base";

type NumberInputProps = Omit<ArkNumberInput.RootProps, "children"> & {
  label?: string;
  class?: string;
  error?: boolean;
};

const NumberInputControl = () => (
  <>
    <NumberInputBase.Control>
      <NumberInputBase.Input />
      <NumberInputBase.TriggerGroup>
        <NumberInputBase.IncrementTrigger>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </NumberInputBase.IncrementTrigger>
        <NumberInputBase.DecrementTrigger>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </NumberInputBase.DecrementTrigger>
      </NumberInputBase.TriggerGroup>
    </NumberInputBase.Control>
    <NumberInputBase.Scrubber>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </NumberInputBase.Scrubber>
  </>
);

const NumberInput: Component<NumberInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "disabled", "error"]);
  return (
    <NumberInputBase.Root class={local.class} disabled={local.disabled} {...others}>
      {local.label && <NumberInputBase.Label>{local.label}</NumberInputBase.Label>}
      <NumberInputControl />
    </NumberInputBase.Root>
  );
};

export { NumberInput, NumberInputBase };

export { numberInputVariants, type NumberInputVariants } from "../recipes/number-input";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--input</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { NumberInput } from "~/components/number-input";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<NumberInput defaultValue={50} min={0} max={100} />
      `}</Pre>
      <H2>With Label</H2>
      <P>
        Add a label using the <InlineCode>label</InlineCode> prop.
      </P>
      <Pre>{`

<NumberInput label="Quantity" defaultValue={1} min={1} max={10} />
      `}</Pre>
      <H2>Error State</H2>
      <P>
        Use the <InlineCode>error</InlineCode> prop to show an error state.
      </P>
      <Pre>{`

<NumberInput label="Amount" defaultValue={0} error />
      `}</Pre>
      <H2>Disabled</H2>
      <P>
        Use the <InlineCode>disabled</InlineCode> prop to disable the input.
      </P>
      <Pre>{`

<NumberInput defaultValue={50} disabled />
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/number-input">Ark UI Number Input</A>{" "}
        documentation.
      </P>
    </>
  );
}
