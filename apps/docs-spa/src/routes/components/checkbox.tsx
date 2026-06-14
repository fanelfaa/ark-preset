import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import { H1, H2, H3, P, InlineCode, List, Pre, A } from "../../components/markdown";

import CheckboxBasicDemo from "@demos/checkbox-demo/CheckboxBasicDemo.tsx";
import CheckboxRootProviderDemo from "@demos/checkbox-demo/CheckboxRootProviderDemo.tsx";

export const Route = createFileRoute("/components/checkbox")({ component: CheckboxPage });

function CheckboxPage() {
  return (
    <>
      <H1>Checkbox</H1>
      <P>
        A checkbox component for capturing boolean input with support for checked, unchecked, and
        indeterminate states.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/checkbox" />
      <CheckboxBasicDemo />
      <Pre>{`

import { Checkbox, CheckboxLabel, CheckboxRootProvider } from "~/components/checkbox";

export function CheckboxDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Checkbox defaultChecked>
        <CheckboxLabel>Checked</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxLabel>Unchecked</CheckboxLabel>
      </Checkbox>
      <Checkbox checked="indeterminate">
        <CheckboxLabel>Indeterminate</CheckboxLabel>
      </Checkbox>
      <Checkbox disabled>
        <CheckboxLabel>Disabled</CheckboxLabel>
      </Checkbox>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add checkbox
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/checkbox.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const checkboxVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    control:
      "peer size-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
    indicator: "flex items-center justify-center text-current",
    label:
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/checkbox/checkbox.base.tsx`:
        <Pre>{`import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { splitProps, type Component } from "solid-js";
import { checkboxVariants } from "../recipes/checkbox";

const styles = checkboxVariants();

const CheckboxRoot: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Root class={styles.root({ class: local.class })} {...others} />;
};

const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const CheckboxControl: Component<ArkCheckbox.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Control class={styles.control({ class: local.class })} {...others} />;
};

const CheckboxLabel: Component<ArkCheckbox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Label class={styles.label({ class: local.class })} {...others} />;
};

const CheckboxIndicator: Component<ArkCheckbox.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCheckbox.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const CheckboxHiddenInput = ArkCheckbox.HiddenInput;

export const Checkbox = {
  Root: CheckboxRoot,
  RootProvider: CheckboxRootProvider,
  Control: CheckboxControl,
  Label: CheckboxLabel,
  Indicator: CheckboxIndicator,
  HiddenInput: CheckboxHiddenInput,
};`}</Pre>
        `src/components/checkbox/index.tsx`:
        <Pre>{`import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { splitProps, type Component } from "solid-js";
import { Checkbox as CheckboxBase } from "./checkbox.base";
const CheckboxLabel = CheckboxBase.Label;

const CheckboxControl = () => (
  <>
    <CheckboxBase.Control>
      <CheckboxBase.Indicator>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </CheckboxBase.Indicator>
      <CheckboxBase.Indicator indeterminate>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5">
          <path d="M5 12h14" />
        </svg>
      </CheckboxBase.Indicator>
    </CheckboxBase.Control>
    <CheckboxBase.HiddenInput />
  </>
);

const Checkbox: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CheckboxBase.Root class={local.class} {...others}>
      <CheckboxControl />
      {local.children}
    </CheckboxBase.Root>
  );
};

const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CheckboxBase.RootProvider class={local.class} {...others}>
      <CheckboxControl />
      {local.children}
    </CheckboxBase.RootProvider>
  );
};

export { Checkbox, CheckboxRootProvider, CheckboxLabel, CheckboxBase };

export { checkboxVariants, type CheckboxVariants } from "../recipes/checkbox";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { Checkbox, CheckboxLabel, CheckboxRootProvider } from "~/components/checkbox";
      `}</Pre>
      <P>Basic checkbox:</P>
      <Pre>{`

<Checkbox />
      `}</Pre>
      <P>With label:</P>
      <Pre>{`

<Checkbox defaultChecked>
  <CheckboxLabel>Accept terms</CheckboxLabel>
</Checkbox>
      `}</Pre>
      <P>Disabled:</P>
      <Pre>{`

<Checkbox disabled />
      `}</Pre>
      <P>Indeterminate:</P>
      <Pre>{`

<Checkbox checked="indeterminate" />
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>CheckboxRootProvider</InlineCode> when you need to access the checkbox state
        outside of the checkbox tree. This pattern uses the <InlineCode>useCheckbox</InlineCode>{" "}
        hook from Ark UI to create a shared context that both the checkbox and external elements can
        reference.
      </P>
      <CheckboxRootProviderDemo />
      <Pre>{`

import { useCheckbox } from "@ark-ui/solid/checkbox";
import { CheckboxRootProvider, CheckboxLabel } from "~/components/checkbox";

export function CheckboxWithExternalControl() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div>
      {/* Access checkbox state outside the tree */}
      <output>Checked: {JSON.stringify(checkbox().checked)}</output>

      <CheckboxRootProvider value={checkbox}>
        <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
      </CheckboxRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Checkbox</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained checkboxes.
        </li>
        <li>
          <strong>
            <InlineCode>CheckboxRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created checkbox context via <InlineCode>useCheckbox</InlineCode>. Use
          when you need to read or control the checkbox state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/checkbox">Ark UI Checkbox</A>{" "}
        documentation.
      </P>
    </>
  );
}
