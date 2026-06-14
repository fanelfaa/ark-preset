import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import PasswordInputBasicDemo from "@demos/password-input-demo/PasswordInputBasicDemo.tsx";
import PasswordInputRootProviderDemo from "@demos/password-input-demo/PasswordInputRootProviderDemo.tsx";

export const Route = createFileRoute("/components/password-input")({
  component: PasswordInputPage,
});

function PasswordInputPage() {
  return (
    <>
      <H1>Password Input</H1>
      <P>
        A password input component with a visibility toggle button and support for labels and error
        states.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/password-input" />
      <PasswordInputBasicDemo />
      <Pre>{`

import { PasswordInput } from "~/components/password-input";

export function PasswordInputDemo() {
  return (
    <div class="flex flex-col gap-4">
      <PasswordInput />
      <PasswordInput label="Password" />
      <PasswordInput label="Password" placeholder="Enter your password" />
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add password-input
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/password-input.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const passwordInputVariants = tv({
  slots: {
    root: "grid gap-1.5",
    label: "text-sm font-medium text-foreground",
    control: "relative",
    input:
      "flex h-8 w-full rounded-md border border-input bg-background px-2.5 py-1.5 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive",
    visibilityTrigger:
      "absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    indicator: "inline-flex items-center justify-center",
  },
  variants: {
    disabled: {
      true: {
        root: "opacity-50 cursor-not-allowed",
        visibilityTrigger: "pointer-events-none",
      },
    },
    invalid: {
      true: {
        label: "text-destructive",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    invalid: false,
  },
});

export type PasswordInputVariants = VariantProps<typeof passwordInputVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files:
        `src/components/password-input/password-input.base.tsx`:
        <Pre>{`import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { splitProps, type Component } from "solid-js";
import { passwordInputVariants } from "../recipes/password-input";

const styles = passwordInputVariants();

const PasswordInputRoot: Component<ArkPasswordInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const PasswordInputRootProvider: Component<ArkPasswordInput.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPasswordInput.RootProvider class={styles.root({ class: local.class })} {...others} />
  );
};

const PasswordInputLabel: Component<ArkPasswordInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const PasswordInputControl: Component<ArkPasswordInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const PasswordInputField: Component<ArkPasswordInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const PasswordInputVisibilityTrigger: Component<ArkPasswordInput.VisibilityTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPasswordInput.VisibilityTrigger
      class={styles.visibilityTrigger({ class: local.class })}
      {...others}
    />
  );
};

const PasswordInputIndicator: Component<ArkPasswordInput.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPasswordInput.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const PasswordInput = {
  Root: PasswordInputRoot,
  RootProvider: PasswordInputRootProvider,
  Label: PasswordInputLabel,
  Control: PasswordInputControl,
  Field: PasswordInputField,
  VisibilityTrigger: PasswordInputVisibilityTrigger,
  Indicator: PasswordInputIndicator,
};

\`src/components/password-input/index.tsx\`:`}</Pre>
        <Pre>{`import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { splitProps, type Component } from "solid-js";
import { PasswordInput as PasswordInputBase } from "./password-input.base";

const EyeIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const PasswordInputControl: Component<ArkPasswordInput.InputProps> = (props) => (
  <PasswordInputBase.Control>
    <PasswordInputBase.Field {...props} />
    <PasswordInputBase.VisibilityTrigger>
      <PasswordInputBase.Indicator fallback={<EyeOffIcon />}>
        <EyeIcon />
      </PasswordInputBase.Indicator>
    </PasswordInputBase.VisibilityTrigger>
  </PasswordInputBase.Control>
);

const PasswordInput: Component<ArkPasswordInput.RootProps & { label?: string; placeholder?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <PasswordInputBase.Root class={local.class} {...others}>
      {local.label && <PasswordInputBase.Label>{local.label}</PasswordInputBase.Label>}
      <PasswordInputControl placeholder={local.placeholder} />
    </PasswordInputBase.Root>
  );
};

const PasswordInputRootProvider: Component<ArkPasswordInput.RootProviderProps & { label?: string; placeholder?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <PasswordInputBase.RootProvider class={local.class} {...others}>
      {local.label && <PasswordInputBase.Label>{local.label}</PasswordInputBase.Label>}
      <PasswordInputControl placeholder={local.placeholder} />
    </PasswordInputBase.RootProvider>
  );
};

export { PasswordInput, PasswordInputRootProvider, PasswordInputBase };

export { passwordInputVariants, type PasswordInputVariants } from "../recipes/password-input";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { PasswordInput } from "~/components/password-input";
      `}</Pre>
      <P>Basic:</P>
      <Pre>{`

<PasswordInput />
      `}</Pre>
      <P>With label:</P>
      <Pre>{`

<PasswordInput label="Password" />
      `}</Pre>
      <P>With placeholder:</P>
      <Pre>{`

<PasswordInput label="Password" placeholder="Enter your password" />
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>PasswordInputRootProvider</InlineCode> when you need to control the password
        input state externally.
      </P>
      <PasswordInputRootProviderDemo />
      <Pre>{`

import { usePasswordInput } from "@ark-ui/solid/password-input";
import { Button } from "~/components/button";
import { PasswordInputRootProvider } from "~/components/password-input";

export function PasswordInputWithExternalControl() {
  const passwordInput = usePasswordInput();

  return (
    <div>
      <output>Value: {JSON.stringify(passwordInput().value)}</output>

      <Button onClick={() => passwordInput().toggleVisible()}>
        Toggle
      </Button>

      <PasswordInputRootProvider value={passwordInput} />
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>PasswordInput</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained password inputs.
        </li>
        <li>
          <strong>
            <InlineCode>PasswordInputRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created password input context via{" "}
          <InlineCode>usePasswordInput</InlineCode>. Use when you need to read or control the
          password input state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the{" "}
        <A href="https://ark-ui.com/docs/components/password-input">Ark UI Password Input</A>{" "}
        documentation.
      </P>
    </>
  );
}
