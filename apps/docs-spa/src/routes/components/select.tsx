import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import SelectBasicDemo from "@demos/select-demo/SelectBasicDemo.tsx";
import SelectRootProviderDemo from "@demos/select-demo/SelectRootProviderDemo.tsx";
import SelectMultipleDemo from "@demos/select-demo/SelectMultipleDemo.tsx";
import SelectSearchableDemo from "@demos/select-demo/SelectSearchableDemo.tsx";

export const Route = createFileRoute("/components/select")({ component: SelectPage });

function SelectPage() {
  return (
    <>
      <H1>Select</H1>
      <P>A dropdown component that allows users to select one or more options from a list.</P>
      <DocsLink href="https://ark-ui.com/docs/components/select" />
      <SelectBasicDemo />
      <Pre lang="tsx">{`

import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/select";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export function SelectDemo() {
  return (
    <Select collection={frameworks}>
      <SelectLabel>Framework</SelectLabel>
      <SelectTrigger placeholder="Select a framework" />
      <SelectContent>
        <Index each={frameworks.items}>
          {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
        </Index>
      </SelectContent>
    </Select>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add select
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/select.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const selectVariants = tv({
  slots: {
    root: "grid gap-1.5 w-full",
    label: "text-sm font-medium text-foreground",
    control:
      "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-2.5 py-1.5 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
    trigger: "flex flex-1 items-center justify-start size-4 [&[data-state=open]>svg]:rotate-180",
    valueText: "text-sm data-[placeholder-shown]:text-muted-foreground",
    indicator: "size-4 transition-transform text-muted-foreground",
    positioner: "z-50",
    content:
      "z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-md border border-border bg-background p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
    itemText: "flex-1",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
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

export type SelectVariants = VariantProps<typeof selectVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory at `src/components/select/`: `select.base.tsx`:
        <Pre lang="tsx">{`import { Select as ArkSelect } from "@ark-ui/solid/select";
import { splitProps, type Component } from "solid-js";
import { selectVariants } from "../recipes/select";

const styles = selectVariants();

type RootProps = ArkSelect.RootProps<{ label: string; value: string }> & { class?: string; error?: boolean };

const Root: Component<RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  const localStyles = selectVariants({ error: !!local.error });
  return <ArkSelect.Root class={localStyles.root({ class: local.class })} {...others} />;
};

type RootProviderProps = ArkSelect.RootProviderProps<{ label: string; value: string }> & { class?: string };

const RootProvider: Component<RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkSelect.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Label class={styles.label({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkSelect.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkSelect.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkSelect.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Item: Component<ArkSelect.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkSelect.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkSelect.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSelect.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />;
};

const Select = {
  Root,
  RootProvider,
  Label,
  Trigger,
  ValueText,
  Positioner,
  Item,
  ItemText,
  ItemIndicator,
};

export { Select };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/select/index.tsx`:
        <Pre lang="tsx">{`import { Select as SelectBase } from "./select.base";
import { Select as ArkSelect } from "@ark-ui/solid/select";
import { Portal } from "solid-js/web";
import { splitProps, type Component, type JSX } from "solid-js";
import { selectVariants } from "../recipes/select";

const styles = selectVariants();

// ── Select ──────────────────────────────────────────────────────────
// Root wrapper. Alias for SelectBase.Root.

const Select = SelectBase.Root;

// ── SelectLabel ──────────────────────────────────────────────────────

const SelectLabel = SelectBase.Label;

// ── SelectTrigger ────────────────────────────────────────────────────
// Composite: Control shell + Trigger button + ValueText + chevron Indicator.

type TriggerProps = ArkSelect.TriggerProps & {
  class?: string;
  placeholder?: string;
};

const SelectTrigger: Component<TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "placeholder"]);
  return (
    <ArkSelect.Control class={styles.control({ class: local.class })}>
      <ArkSelect.Trigger class={styles.trigger()}>
        <ArkSelect.ValueText class={styles.valueText()} placeholder={local.placeholder} />
      </ArkSelect.Trigger>
      <ArkSelect.Indicator class={styles.indicator()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="m6 9 6 6 6-6"/></svg>
      </ArkSelect.Indicator>
    </ArkSelect.Control>
  );
};

// ── SelectContent ────────────────────────────────────────────────────
// Composite: Portal + Positioner + Content shell.

type ContentProps = ArkSelect.ContentProps & {
  class?: string;
  children?: JSX.Element;
};

const SelectContent: Component<ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <SelectBase.Positioner>
        <ArkSelect.Content class={styles.content({ class: local.class })} {...others}>
          {local.children}
        </ArkSelect.Content>
      </SelectBase.Positioner>
    </Portal>
  );
};

// ── SelectItem ───────────────────────────────────────────────────────
// Composite: Item + ItemText + checkmark ItemIndicator.

type ItemProps = ArkSelect.ItemProps & { class?: string; children?: JSX.Element };

const SelectItem: Component<ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SelectBase.Item class={styles.item({ class: local.class })} {...others}>
      <SelectBase.ItemText class={styles.itemText()}>{local.children}</SelectBase.ItemText>
      <SelectBase.ItemIndicator class={styles.itemIndicator()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M20 6 9 17l-5-5"/></svg>
      </SelectBase.ItemIndicator>
    </SelectBase.Item>
  );
};

const SelectRootProvider = SelectBase.RootProvider;

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectRootProvider,
  SelectBase,
};
export { createListCollection } from "@ark-ui/solid/select";
export { selectVariants, type SelectVariants } from "../recipes/select";
export type { ListCollection } from "@ark-ui/solid/select";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--input</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/select";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

const items = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid.js', value: 'solid' },
  ],
})

<Select collection={items}>
  <SelectLabel>Framework</SelectLabel>
  <SelectTrigger placeholder="Select..." />
  <SelectContent>
    <Index each={items.items}>
      {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
    </Index>
  </SelectContent>
</Select>
      `}</Pre>
      <H2>With Label</H2>
      <P>Add a label to describe the select field.</P>
      <Pre lang="tsx">{`

<Select collection={items}>
  <SelectLabel>Choose your framework</SelectLabel>
  <SelectTrigger placeholder="Select..." />
  <SelectContent>
    <Index each={items.items}>
      {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
    </Index>
  </SelectContent>
</Select>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>SelectRootProvider</InlineCode> when you need to access the select state
        outside of the component tree. This pattern uses the <InlineCode>useSelect</InlineCode> hook
        from Ark UI to create a shared context that both the select and external elements can
        reference.
      </P>
      <SelectRootProviderDemo />
      <Pre lang="tsx">{`

import { useSelect, createListCollection } from "@ark-ui/solid/select";
import { Index } from "solid-js";
import { SelectRootProvider, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "~/components/select";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export function SelectWithExternalControl() {
  const select = useSelect({ collection: frameworks, defaultValue: ["solid"] });

  return (
    <div>
      {/* Access select state outside the tree */}
      <output>Value: {JSON.stringify(select().value)}</output>

      <SelectRootProvider value={select}>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger placeholder="Select a framework" />
        <SelectContent>
          <Index each={frameworks.items}>
            {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
          </Index>
        </SelectContent>
      </SelectRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Select</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained selects.
        </li>
        <li>
          <strong>
            <InlineCode>SelectRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created select context via <InlineCode>useSelect</InlineCode>. Use when
          you need to read or control the select state from outside the component tree.
        </li>
      </List>
      <H2>Multiple Selection</H2>
      <P>
        Use the <InlineCode>multiple</InlineCode> prop to allow selecting multiple options. The{" "}
        <InlineCode>SelectTrigger</InlineCode> composite includes a clear button to deselect all
        selections.
      </P>
      <SelectMultipleDemo />
      <Pre lang="tsx">{`

import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/select";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export function SelectMultipleDemo() {
  return (
    <Select collection={frameworks} multiple>
      <SelectLabel>Framework</SelectLabel>
      <SelectTrigger placeholder="Select frameworks" />
      <SelectContent>
        <Index each={frameworks.items}>
          {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
        </Index>
      </SelectContent>
    </Select>
  );
}
      `}</Pre>
      <H2>Searchable Selection</H2>
      <P>
        Use the <InlineCode>searchable</InlineCode> prop to enable a search input inside the
        dropdown. Pass <InlineCode>onSearch</InlineCode> to filter the collection as the user types.
      </P>
      <SelectSearchableDemo />
      <Pre lang="tsx">{`

import { useFilter, useListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/select";

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

export function SelectSearchableDemo() {
  return (
    <Select
      collection={collection()}
      searchable
      onSearch={(value) => filter(value)}
    >
      <SelectLabel>Framework</SelectLabel>
      <SelectTrigger placeholder="Select a framework" />
      <SelectContent>
        <Index each={collection().items}>
          {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
        </Index>
      </SelectContent>
    </Select>
  );
}
      `}</Pre>
      <P>
        The <InlineCode>searchable</InlineCode> prop works with both single and{" "}
        <InlineCode>multiple</InlineCode> selection modes.
      </P>
      <H2>Error State</H2>
      <P>
        Use the <InlineCode>error</InlineCode> prop on <InlineCode>SelectBase.Root</InlineCode> to
        show an error state. The structured <InlineCode>Select</InlineCode> component delegates its
        root styling to <InlineCode>SelectBase.Root</InlineCode>, so the{" "}
        <InlineCode>error</InlineCode> prop requires using the base component directly:
      </P>
      <Pre lang="tsx">{`

<SelectBase.Root collection={items} error>
  <SelectLabel>Framework</SelectLabel>
  <SelectTrigger placeholder="Select..." />
  <SelectContent>
    <Index each={items.items}>
      {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
    </Index>
  </SelectContent>
</SelectBase.Root>
      `}</Pre>
      <H2>Composite Exports</H2>
      <P>
        The <InlineCode>SelectTrigger</InlineCode>, <InlineCode>SelectContent</InlineCode>, and{" "}
        <InlineCode>SelectItem</InlineCode> components are composite wrappers from the barrel entry
        point that include inline SVG icons and Portal. <InlineCode>SelectTrigger</InlineCode> also
        includes a clear button when used with <InlineCode>multiple</InlineCode> selection. Import
        them alongside <InlineCode>Select</InlineCode>:
      </P>
      <Pre lang="tsx">{`

import { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "~/components/select";
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>When you need more control, import raw primitive parts directly from the base file:</P>
      <Pre lang="tsx">{`

import { Select } from "~/components/select/select.base";
      `}</Pre>
      <P>
        Or import <InlineCode>SelectBase</InlineCode> (the raw parts namespace) from the barrel
        entry point:
      </P>
      <Pre lang="tsx">{`

import { SelectBase } from "~/components/select";
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/select">Ark UI Select</A> documentation.
      </P>
    </>
  );
}
