import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ComboboxBasicDemo from "@demos/combobox-demo/ComboboxBasicDemo.tsx";
import ComboboxRootProviderDemo from "@demos/combobox-demo/ComboboxRootProviderDemo.tsx";

export const Route = createFileRoute("/components/combobox")({ component: ComboboxPage });

function ComboboxPage() {
  return (
    <>
      <H1>Combobox</H1>
      <P>
        An autocomplete input component that allows users to filter and select options from a list
        by typing.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/combobox" />
      <ComboboxBasicDemo />
      <Pre>{`

import { useFilter } from "@ark-ui/solid";
import { useListCollection } from "@ark-ui/solid/combobox";
import { Index } from "solid-js";
import { Combobox, ComboboxLabel, ComboboxInputTrigger, ComboboxContent, ComboboxItem } from "~/components/combobox";

const filterFn = useFilter({ sensitivity: "base" });
const { collection, filter } = useListCollection({
  initialItems: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
  filter: filterFn().contains,
});

function ComboboxDemo() {
  return (
    <Combobox
      collection={collection()}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxInputTrigger placeholder="Search frameworks..." />
      <ComboboxContent>
        <Index each={collection().items}>
          {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
        </Index>
      </ComboboxContent>
    </Combobox>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add combobox
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/combobox.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const comboboxVariants = tv({
  slots: {
    root: "grid gap-1.5 w-full",
    label: "text-sm font-medium text-foreground",
    control:
      "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2.5 py-1 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    input:
      "flex flex-1 items-center justify-start bg-transparent text-sm placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
    trigger:
      "flex size-4 items-center justify-center text-muted-foreground [&[data-state=open]>svg]:rotate-180",
    clearTrigger:
      "flex size-4 items-center justify-center text-muted-foreground hover:text-foreground",
    positioner: "z-50",
    content:
      "z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-md border border-border bg-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    list: "space-y-1",
    item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    itemText: "flex-1",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
    empty: "py-2 text-center text-sm text-muted-foreground",
  },
  variants: {
    error: {
      true: {
        control: "border-destructive focus-within:ring-destructive",
        label: "text-destructive",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export type ComboboxVariants = VariantProps<typeof comboboxVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory at `src/components/combobox/`: `combobox.base.tsx`:
        <Pre>{`import { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { splitProps, type Component } from "solid-js";
import { comboboxVariants, type ComboboxVariants } from "../recipes/combobox";

const styles = comboboxVariants();

type RootProps = ArkCombobox.RootProps<{ label: string; value: string }> & { class?: string; error?: boolean };

const Root: Component<RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return <ArkCombobox.Root class={styles.root({ class: local.class, error: !!local.error })} {...others} />;
};

type RootProviderProps = ArkCombobox.RootProviderProps<{ label: string; value: string }> & { class?: string };

const RootProvider: Component<RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkCombobox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Label class={styles.label({ class: local.class })} {...others} />;
};

const Input: Component<ArkCombobox.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Input class={styles.input({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkCombobox.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkCombobox.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const List: Component<ArkCombobox.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.List class={styles.list({ class: local.class })} {...others} />;
};

const Item: Component<ArkCombobox.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkCombobox.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkCombobox.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />;
};

const Empty: Component<ArkCombobox.EmptyProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCombobox.Empty class={styles.empty({ class: local.class })} {...others} />;
};

const Combobox = { Root, RootProvider, Label, Input, Trigger, Positioner, List, Item, ItemText, ItemIndicator, Empty };

export { Combobox };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/combobox/index.tsx`:
        <Pre>{`import { Combobox as ComboboxBase } from "./combobox.base";
import type { Combobox as ArkCombobox } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { splitProps, type Component, type JSX } from "solid-js";

const Combobox = ComboboxBase.Root;

const ComboboxLabel = ComboboxBase.Label;

type InputTriggerProps = ArkCombobox.InputProps;

const InputTrigger: Component<InputTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ComboboxBase.Control class={local.class}>
      <ComboboxBase.Input {...others} />
      <ComboboxBase.ClearTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </ComboboxBase.ClearTrigger>
      <ComboboxBase.Trigger>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="m6 9 6 6 6-6"/></svg>
      </ComboboxBase.Trigger>
    </ComboboxBase.Control>
  );
};

type ContentProps = ArkCombobox.ContentProps & {
  class?: string;
  children?: JSX.Element;
};

const Content: Component<ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <ComboboxBase.Positioner>
        <ComboboxBase.Content class={local.class} {...others}>
          <ComboboxBase.List>{local.children}</ComboboxBase.List>
        </ComboboxBase.Content>
      </ComboboxBase.Positioner>
    </Portal>
  );
};

type ItemProps = ArkCombobox.ItemProps & { class?: string; children?: JSX.Element };

const Item: Component<ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ComboboxBase.Item class={local.class} {...others}>
      <ComboboxBase.ItemText>{local.children}</ComboboxBase.ItemText>
      <ComboboxBase.ItemIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M20 6 9 17l-5-5"/></svg>
      </ComboboxBase.ItemIndicator>
    </ComboboxBase.Item>
  );
};

const ComboboxRootProvider = ComboboxBase.RootProvider;

const ComboboxInputTrigger = InputTrigger;
const ComboboxContent = Content;
const ComboboxItem = Item;

export {
  Combobox,
  ComboboxLabel,
  ComboboxInputTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxRootProvider,
  ComboboxBase,
};
export { comboboxVariants, type ComboboxVariants } from "../recipes/combobox";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--input</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import { useFilter } from "@ark-ui/solid";
import { useListCollection } from "@ark-ui/solid/combobox";
import { Index } from "solid-js";
import { Combobox, ComboboxLabel, ComboboxInputTrigger, ComboboxContent, ComboboxItem } from "~/components/combobox";
      `}</Pre>
      <P>Basic usage with client-side filtering:</P>
      <Pre>{`

const filterFn = useFilter({ sensitivity: "base" });
const { collection, filter } = useListCollection({
  initialItems: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
  ],
  filter: filterFn().contains,
});

<Combobox
  collection={collection()}
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Framework</ComboboxLabel>
  <ComboboxInputTrigger placeholder="Search..." />
  <ComboboxContent>
    <Index each={collection().items}>
      {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
    </Index>
  </ComboboxContent>
</Combobox>
      `}</Pre>
      <H2>With Label</H2>
      <P>Add a label to describe the combobox field.</P>
      <Pre>{`

<Combobox
  collection={collection()}
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Choose your framework</ComboboxLabel>
  <ComboboxInputTrigger placeholder="Search..." />
  <ComboboxContent>
    <Index each={collection().items}>
      {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
    </Index>
  </ComboboxContent>
</Combobox>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>ComboboxRootProvider</InlineCode> when you need to access the combobox state
        outside of the component tree. This pattern uses the <InlineCode>useCombobox</InlineCode>{" "}
        hook from Ark UI to create a shared context that both the combobox and external elements can
        reference.
      </P>
      <ComboboxRootProviderDemo />
      <Pre>{`

import { useFilter } from "@ark-ui/solid";
import { useCombobox, useListCollection } from "@ark-ui/solid/combobox";
import { Index } from "solid-js";
import { ComboboxRootProvider, ComboboxLabel, ComboboxInputTrigger, ComboboxContent, ComboboxItem } from "~/components/combobox";

const filterFn = useFilter({ sensitivity: "base" });
const { collection, filter } = useListCollection({
  initialItems: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
  filter: filterFn().contains,
});

function ComboboxWithExternalControl() {
  const combobox = useCombobox({
    get collection() {
      return collection();
    },
    defaultValue: ["solid"],
    onInputValueChange(details) {
      filter(details.inputValue);
    },
  });

  return (
    <div>
      <output>Value: {JSON.stringify(combobox().value)}</output>

      <ComboboxRootProvider value={combobox}>
        <ComboboxLabel>Framework</ComboboxLabel>
        <ComboboxInputTrigger placeholder="Search frameworks..." />
        <ComboboxContent>
          <Index each={collection().items}>
            {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
          </Index>
        </ComboboxContent>
      </ComboboxRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Combobox</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained comboboxes.
        </li>
        <li>
          <strong>
            <InlineCode>ComboboxRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created combobox context via <InlineCode>useCombobox</InlineCode>. Use
          when you need to read or control the combobox state from outside the component tree.
        </li>
      </List>
      <H2>Error State</H2>
      <P>
        Use the <InlineCode>error</InlineCode> prop on <InlineCode>ComboboxBase.Root</InlineCode> to
        show an error state. The structured <InlineCode>Combobox</InlineCode> component delegates
        its root styling to <InlineCode>ComboboxBase.Root</InlineCode>, so the{" "}
        <InlineCode>error</InlineCode> prop requires using the base component directly:
      </P>
      <Pre>{`

<ComboboxBase.Root
  collection={collection()}
  onInputValueChange={(details) => filter(details.inputValue)}
  error
>
  <ComboboxLabel>Framework</ComboboxLabel>
  <ComboboxInputTrigger placeholder="Search..." />
  <ComboboxContent>
    <Index each={collection().items}>
      {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
    </Index>
  </ComboboxContent>
</ComboboxBase.Root>
      `}</Pre>
      <H2>Composite Exports</H2>
      <P>
        The <InlineCode>ComboboxInputTrigger</InlineCode>, <InlineCode>ComboboxContent</InlineCode>,
        and <InlineCode>ComboboxItem</InlineCode> components are composite exports from the barrel
        entry point that include inline SVG icons and Portal. Import them alongside{" "}
        <InlineCode>Combobox</InlineCode>:
      </P>
      <Pre>{`

import { Combobox, ComboboxLabel, ComboboxInputTrigger, ComboboxContent, ComboboxItem } from "~/components/combobox";
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>When you need more control, import raw primitive parts directly from the base file:</P>
      <Pre>{`

import { Combobox } from "~/components/combobox/combobox.base";
      `}</Pre>
      <P>
        Or import <InlineCode>ComboboxBase</InlineCode> (the raw parts namespace) from the barrel
        entry point:
      </P>
      <Pre>{`

import { ComboboxBase } from "~/components/combobox";
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/combobox">Ark UI Combobox</A>{" "}
        documentation.
      </P>
    </>
  );
}
