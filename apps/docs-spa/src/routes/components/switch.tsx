import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import { H1, H2, H3, P, InlineCode, List, Pre, A } from "../../components/markdown";

import SwitchBasicDemo from "@demos/switch-demo/SwitchBasicDemo.tsx";
import SwitchRootProviderDemo from "@demos/switch-demo/SwitchRootProviderDemo.tsx";

export const Route = createFileRoute("/components/switch")({ component: SwitchPage });

function SwitchPage() {
  return (
    <>
      <H1>Switch</H1>
      <P>A toggle switch component for on/off boolean input.</P>
      <DocsLink href="https://ark-ui.com/docs/components/switch" />
      <SwitchBasicDemo />
      <Pre>{`

import { Switch, SwitchLabel, SwitchRootProvider } from "~/components/switch";

export function SwitchDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Switch>
        <SwitchLabel>Off</SwitchLabel>
      </Switch>
      <Switch defaultChecked>
        <SwitchLabel>On</SwitchLabel>
      </Switch>
      <Switch disabled>
        <SwitchLabel>Disabled</SwitchLabel>
      </Switch>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add switch
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/switch.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const switchVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    control:
      "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    thumb:
      "pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
    label:
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/switch/switch.base.tsx`:
        <Pre>{`import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import { switchVariants } from "../recipes/switch";

const styles = switchVariants();

const SwitchRoot: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Root class={styles.root({ class: local.class })} {...others} />;
};

const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const SwitchControl: Component<ArkSwitch.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Control class={styles.control({ class: local.class })} {...others} />;
};

const SwitchThumb: Component<ArkSwitch.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Thumb class={styles.thumb({ class: local.class })} {...others} />;
};

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Label class={styles.label({ class: local.class })} {...others} />;
};

const SwitchHiddenInput = ArkSwitch.HiddenInput;

export const Switch = {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  HiddenInput: SwitchHiddenInput,
};`}</Pre>
        `src/components/switch/index.tsx`:
        <Pre>{`import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import { Switch as SwitchBase } from "./switch.base";

const styles = switchVariants();

const SwitchControl = () => (
  <>
    <SwitchBase.Control>
      <SwitchBase.Thumb />
    </SwitchBase.Control>
    <SwitchBase.HiddenInput />
  </>
);

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => (
  <SwitchBase.Label class={styles.label({ class: props.class })} {...props} />
);

const Switch: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SwitchBase.Root class={local.class} {...others}>
      <SwitchControl />
      {local.children}
    </SwitchBase.Root>
  );
};

const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SwitchBase.RootProvider class={local.class} {...others}>
      <SwitchControl />
      {local.children}
    </SwitchBase.RootProvider>
  );
};

export { Switch, SwitchRootProvider, SwitchLabel, SwitchBase };

export { switchVariants, type SwitchVariants } from "../recipes/switch";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { Switch, SwitchLabel, SwitchRootProvider } from "~/components/switch";
      `}</Pre>
      <P>Basic switch:</P>
      <Pre>{`

<Switch />
      `}</Pre>
      <P>With label:</P>
      <Pre>{`

<Switch defaultChecked>
  <SwitchLabel>Enable notifications</SwitchLabel>
</Switch>
      `}</Pre>
      <P>Disabled:</P>
      <Pre>{`

<Switch disabled />
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>SwitchRootProvider</InlineCode> when you need to access the switch state
        outside of the switch tree. This pattern uses the <InlineCode>useSwitch</InlineCode> hook
        from Ark UI to create a shared context that both the switch and external elements can
        reference.
      </P>
      <SwitchRootProviderDemo />
      <Pre>{`

import { useSwitch } from "@ark-ui/solid/switch";
import { SwitchRootProvider, SwitchLabel } from "~/components/switch";

export function SwitchWithExternalControl() {
  const sw = useSwitch({ defaultChecked: true });

  return (
    <div>
      {/* Access switch state outside the tree */}
      <output>Checked: {JSON.stringify(sw().checked)}</output>

      <SwitchRootProvider value={sw}>
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Switch</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained switches.
        </li>
        <li>
          <strong>
            <InlineCode>SwitchRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created switch context via <InlineCode>useSwitch</InlineCode>. Use when
          you need to read or control the switch state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/switch">Ark UI Switch</A> documentation.
      </P>
    </>
  );
}
