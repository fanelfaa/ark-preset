import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ToggleGroupBasicDemo from "@demos/toggle-group-demo/ToggleGroupBasicDemo.tsx";
import ToggleGroupSizesDemo from "@demos/toggle-group-demo/ToggleGroupSizesDemo.tsx";
import ToggleGroupRootProviderDemo from "@demos/toggle-group-demo/ToggleGroupRootProviderDemo.tsx";

export const Route = createFileRoute("/components/toggle-group")({ component: ToggleGroupPage });

function ToggleGroupPage() {
  return (
    <>
      <H1>Toggle Group</H1>
      <P>
        A group of toggle buttons that allows single or multiple selection from a set of options,
        commonly used for formatting toolbars like text alignment.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/toggle-group" />
      <ToggleGroupBasicDemo />
      <Pre>{`

import { ToggleGroup, ToggleGroupItem } from "~/components/toggle-group";

export function ToggleGroupDemo() {
  return (
    <div class="flex flex-col gap-6">
      {/* Single selection */}
      <ToggleGroup defaultValue={["left"]}>
        <ToggleGroupItem value="left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Multiple selection */}
      <ToggleGroup defaultValue={["bold"]} multiple>
        <ToggleGroupItem value="bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
      `}</Pre>
      <H2>Sizes</H2>
      <P>
        Use the <InlineCode>size</InlineCode> prop to change the toggle group item size.
      </P>
      <ToggleGroupSizesDemo />
      <Pre>{`

import { ToggleGroup, ToggleGroupItem } from "~/components/toggle-group";

export function ToggleGroupSizesDemo() {
  return (
    <div class="flex flex-col gap-6">
      <ToggleGroup defaultValue={["sm"]}>
        <ToggleGroupItem size="sm" value="sm">Sm</ToggleGroupItem>
        <ToggleGroupItem size="sm" value="md">Sm</ToggleGroupItem>
        <ToggleGroupItem size="sm" value="lg">Sm</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["md"]}>
        <ToggleGroupItem size="md" value="sm">Md</ToggleGroupItem>
        <ToggleGroupItem size="md" value="md">Md</ToggleGroupItem>
        <ToggleGroupItem size="md" value="lg">Md</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["lg"]}>
        <ToggleGroupItem size="lg" value="sm">Lg</ToggleGroupItem>
        <ToggleGroupItem size="lg" value="md">Lg</ToggleGroupItem>
        <ToggleGroupItem size="lg" value="lg">Lg</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add toggle-group
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/toggle-group.ts`:
        <Pre>{`import { tv, type VariantProps } from "tailwind-variants";

export const toggleGroupVariants = tv({
  slots: {
    root: "inline-flex items-center gap-1 data-[orientation=vertical]:flex-col",
    item: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-transparent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  },
  variants: {
    size: {
      sm: { item: "h-8 px-2.5" },
      md: { item: "h-9 px-3 py-1.5" },
      lg: { item: "h-10 px-6" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/toggle-group/toggle-group.base.tsx`:
        <Pre>{`import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import { splitProps, type Component } from "solid-js";
import { toggleGroupVariants, type ToggleGroupVariants } from "../recipes/toggle-group";

const styles = toggleGroupVariants();

const Root: Component<ArkToggleGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkToggleGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Item: Component<ArkToggleGroup.ItemProps & ToggleGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return <ArkToggleGroup.Item class={styles.item({ class: local.class, size: local.size })} {...others} />;
};

export const ToggleGroup = { Root, RootProvider, Item };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/toggle-group/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { ToggleGroup as ToggleGroupBase } from "./toggle-group.base";
import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import type { ToggleGroupVariants } from "../recipes/toggle-group";

type ToggleGroupProps = ArkToggleGroup.RootProps & ToggleGroupVariants;

const ToggleGroup: Component<ToggleGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ToggleGroupBase.Root {...others}>
      {local.children}
    </ToggleGroupBase.Root>
  );
};

export { ToggleGroup, ToggleGroupBase };

export const ToggleGroupItem: Component<ArkToggleGroup.ItemProps & ToggleGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <ToggleGroupBase.Item size={local.size} {...others}>
      {props.children}
    </ToggleGroupBase.Item>
  );
};

export { toggleGroupVariants, type ToggleGroupVariants } from "@fan-ui/core";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { ToggleGroup } from "~/components/toggle-group";
      `}</Pre>
      <P>Single selection:</P>
      <Pre>{`

<ToggleGroup defaultValue={["left"]}>
  <ToggleGroupItem value="left"><AlignLeftIcon /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenterIcon /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRightIcon /></ToggleGroupItem>
</ToggleGroup>
      `}</Pre>
      <P>Multiple selection:</P>
      <Pre>{`

<ToggleGroup defaultValue={["bold"]} multiple>
  <ToggleGroupItem value="bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>ToggleGroupBase.RootProvider</InlineCode> when you need to control the
        toggle group state externally.
      </P>
      <ToggleGroupRootProviderDemo />
      <Pre>{`

import { useToggleGroup } from "@ark-ui/solid/toggle-group";
import { ToggleGroupBase, ToggleGroupItem } from "~/components/toggle-group";

const tg = useToggleGroup({ defaultValue: ["left"] });

<ToggleGroupBase.RootProvider value={tg}>
  <ToggleGroupItem value="left"><AlignLeftIcon /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenterIcon /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRightIcon /></ToggleGroupItem>
</ToggleGroupBase.RootProvider>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/toggle-group">Ark UI Toggle Group</A>{" "}
        documentation.
      </P>
    </>
  );
}
