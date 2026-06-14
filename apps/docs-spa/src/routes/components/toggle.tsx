import { createFileRoute } from "@tanstack/solid-router";
import { DocsLink } from "../../components/DocsLink";
import { H1, H2, H3, P, InlineCode, Pre, A } from "../../components/markdown";
import { Toggle } from "@fan-ui/solid";
import ToggleBasicDemo from "@demos/toggle-demo/ToggleBasicDemo.tsx";
import ToggleIndicatorDemo from "@demos/toggle-demo/ToggleIndicatorDemo.tsx";

export const Route = createFileRoute("/components/toggle")({ component: TogglePage });

function TogglePage() {
  return (
    <>
      <H1>Toggle</H1>
      <P>
        A button-like component for toggling between on and off states, commonly used for formatting
        options like bold, italic, or other binary settings.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/toggle" />
      <ToggleBasicDemo />
      <Pre lang="tsx">{`

import { Toggle } from "~/components/toggle";

export function ToggleDemo() {
  return (
    <div class="flex items-center gap-4">
      <Toggle>
        <BoldIcon />
      </Toggle>
      <Toggle defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle disabled>
        <BoldIcon />
      </Toggle>
    </div>
  );
}
      `}</Pre>
      <H2>With Indicator</H2>
      <P>
        <InlineCode>ToggleIndicator</InlineCode> renders different content based on the toggle state
        — the <InlineCode>fallback</InlineCode> is shown when off, and the children are shown when
        on.
      </P>
      <ToggleIndicatorDemo />
      <Pre lang="tsx">{`

import { Toggle, ToggleIndicator } from "~/components/toggle";

export function ToggleIndicatorDemo() {
  return (
    <div class="flex items-center gap-4">
      <Toggle>
        <ToggleIndicator fallback={<SunIcon />}>
          <MoonIcon />
        </ToggleIndicator>
      </Toggle>
      <Toggle defaultPressed>
        <ToggleIndicator fallback={<SunIcon />}>
          <MoonIcon />
        </ToggleIndicator>
      </Toggle>
    </div>
  );
}
      `}</Pre>
      <H2>Sizes</H2>
      <P>
        Use the <InlineCode>size</InlineCode> prop to change the toggle size.
      </P>
      <div class="rounded-lg border border-border p-6">
        <div class="flex flex-wrap items-center gap-4">
          <Toggle size="sm">Sm</Toggle>
          <Toggle size="md">Md</Toggle>
          <Toggle size="lg">Lg</Toggle>
        </div>
      </div>
      <Pre lang="tsx">{`

import { Toggle } from "~/components/toggle";

export function ToggleSizesDemo() {
  return (
    <div class="flex items-center gap-4">
      <Toggle size="sm">Sm</Toggle>
      <Toggle size="md">Md</Toggle>
      <Toggle size="lg">Lg</Toggle>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add toggle
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/toggle.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const toggleVariants = tv({
  slots: {
    root: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-transparent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    indicator: "inline-flex items-center justify-center",
  },
  variants: {
    size: {
      sm: { root: "h-8 px-2.5" },
      md: { root: "h-9 px-3 py-1.5" },
      lg: { root: "h-10 px-6" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ToggleVariants = VariantProps<typeof toggleVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files:
        <Pre lang="tsx">{`// src/components/toggle/toggle.base.tsx
import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { splitProps, type Component } from "solid-js";
import { toggleVariants, type ToggleVariants } from "@fan-ui/core";

const styles = toggleVariants();

const Root: Component<ArkToggle.RootProps & ToggleVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return <ArkToggle.Root class={styles.root({ class: local.class, size: local.size })} {...others} />;
};

const Indicator: Component<ArkToggle.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggle.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const Toggle = { Root, Indicator };`}</Pre>
        <Pre lang="tsx">{`// src/components/toggle/index.tsx
import { Toggle as ToggleBase } from "./toggle.base";

const ToggleRoot = ToggleBase.Root;
const ToggleIndicator = ToggleBase.Indicator;

export { ToggleRoot, ToggleIndicator, ToggleBase };

export { toggleVariants, type ToggleVariants } from "@fan-ui/core";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { Toggle, ToggleIndicator } from "~/components/toggle";
      `}</Pre>
      <P>Basic:</P>
      <Pre lang="tsx">{`

<Toggle>
  <BoldIcon />
</Toggle>
      `}</Pre>
      <P>Default pressed:</P>
      <Pre lang="tsx">{`

<Toggle defaultPressed>
  <BoldIcon />
</Toggle>
      `}</Pre>
      <P>Controlled:</P>
      <Pre lang="tsx">{`

const [pressed, setPressed] = createSignal(false);

<Toggle pressed={pressed()} onPressedChange={setPressed}>
  <BoldIcon />
</Toggle>
      `}</Pre>
      <P>Disabled:</P>
      <Pre lang="tsx">{`

<Toggle disabled>
  <BoldIcon />
</Toggle>
      `}</Pre>
      <P>With Indicator:</P>
      <P>
        <InlineCode>ToggleIndicator</InlineCode> renders different content based on the toggle state
        — the <InlineCode>fallback</InlineCode> is shown when off, and the children are shown when
        on.
      </P>
      <Pre lang="tsx">{`

<Toggle>
  <ToggleIndicator fallback={<SunIcon />}>
    <MoonIcon />
  </ToggleIndicator>
</Toggle>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/toggle">Ark UI Toggle</A> documentation.
      </P>
    </>
  );
}
