import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import TabsBasicDemo from "@demos/tabs-demo/TabsBasicDemo.tsx";
import TabsRootProviderDemo from "@demos/tabs-demo/TabsRootProviderDemo.tsx";
import TabsDisabledDemo from "@demos/tabs-demo/TabsDisabledDemo.tsx";

export const Route = createFileRoute("/components/tabs")({ component: TabsPage });

function TabsPage() {
  return (
    <>
      <H1>Tabs</H1>
      <P>
        A navigable component that organizes content into separate views where only one view is
        visible at a time.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/tabs" />
      <TabsBasicDemo />
      <Pre>{`

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div class="text-sm text-foreground">Make changes to your account here.</div>
      </TabsContent>
      <TabsContent value="password">
        <div class="text-sm text-foreground">Change your password here.</div>
      </TabsContent>
    </Tabs>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add tabs
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/tabs.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const tabsVariants = tv({
  slots: {
    root: "w-full",
    list: "relative inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
    trigger:
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-0.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm",
    content:
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    indicator:
      "absolute bottom-0 left-0 z-10 h-0.5 bg-foreground transition-[left,top,width,height] duration-200",
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the base component file at `src/components/tabs/tabs.base.tsx`:
        <Pre>{`import { Tabs as ArkTabs } from '@ark-ui/solid/tabs'
import { splitProps, type Component } from 'solid-js'
import { tabsVariants } from '../recipes/tabs'

const styles = tabsVariants()

const Root: Component<ArkTabs.RootProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.Root class={styles.root({ class: local.class })} {...others} />
}

const List: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.List class={styles.list({ class: local.class })} {...others} />
}

const Trigger: Component<ArkTabs.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.Trigger class={styles.trigger({ class: local.class })} {...others} />
}

const Content: Component<ArkTabs.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.Content class={styles.content({ class: local.class })} {...others} />
}

const Indicator: Component<ArkTabs.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.Indicator class={styles.indicator({ class: local.class })} {...others} />
}

const RootProvider: Component<ArkTabs.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return <ArkTabs.RootProvider class={styles.root({ class: local.class })} {...others} />
}

const TabsBase = {
  Root,
  RootProvider,
  List,
  Trigger,
  Content,
  Indicator,
}

export { TabsBase, tabsVariants }`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/tabs/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { Tabs as TabsBase } from "./tabs.base";
import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";

type TabsProps = ArkTabs.RootProps;

const Tabs: Component<TabsProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return <TabsBase.Root {...others}>{local.children}</TabsBase.Root>;
};

export const TabsList: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <TabsBase.List class={local.class} {...others}>
      <TabsBase.Indicator />
      {local.children}
    </TabsBase.List>
  );
};

const TabsTrigger: Component<ArkTabs.TriggerProps> = (props) => {
  return <TabsBase.Trigger {...props} />;
};

const TabsContent: Component<ArkTabs.ContentProps> = (props) => {
  return <TabsBase.Content {...props} />;
};

export { Tabs, TabsContent, TabsTrigger, TabsBase, TabsList, tabsVariants };`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--muted</InlineCode>,{" "}
        <InlineCode>--background</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/tabs";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Tab One</TabsTrigger>
    <TabsTrigger value="tab-2">Tab Two</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <div class="text-sm">Content for tab one</div>
  </TabsContent>
  <TabsContent value="tab-2">
    <div class="text-sm">Content for tab two</div>
  </TabsContent>
</Tabs>
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>Tabs</InlineCode> doesn't provide enough control, import the
        raw primitive parts from <InlineCode>TabsBase</InlineCode>:
      </P>
      <Pre>{`

import { TabsBase, TabsTrigger, TabsContent } from "~/components/tabs";
      `}</Pre>
      <H3>Access Raw Parts</H3>
      <P>
        Access raw parts via <InlineCode>TabsBase.Root</InlineCode>,{" "}
        <InlineCode>TabsBase.RootProvider</InlineCode>, <InlineCode>TabsBase.List</InlineCode>,{" "}
        <InlineCode>TabsBase.Trigger</InlineCode>, <InlineCode>TabsBase.Content</InlineCode>, and{" "}
        <InlineCode>TabsBase.Indicator</InlineCode>:
      </P>
      <Pre>{`

<TabsBase.Root defaultValue="account">
  <TabsBase.List>
    <TabsBase.Indicator />
    <TabsBase.Trigger value="account">Account</TabsBase.Trigger>
    <TabsBase.Trigger value="password">Password</TabsBase.Trigger>
  </TabsBase.List>
  <TabsBase.Content value="account">...</TabsBase.Content>
  <TabsBase.Content value="password">...</TabsBase.Content>
</TabsBase.Root>
      `}</Pre>
      <H2>Disabled Tab</H2>
      <P>
        Use the <InlineCode>disabled</InlineCode> prop on a <InlineCode>TabsTrigger</InlineCode> to
        disable that specific tab.
      </P>
      <TabsDisabledDemo />
      <Pre>{`

import { Index } from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/tabs";

const tabs = [
  { value: "active", label: "Active", content: "This tab is enabled and functional." },
  { value: "settings", label: "Settings", content: "Configure your preferences here." },
  { value: "disabled", label: "Disabled", content: "This content is not accessible.", disabled: true },
];

export function DisabledDemo() {
  return (
    <Tabs defaultValue="active">
      <TabsList>
        <Index each={tabs}>
          {(tab) => (
            <TabsTrigger value={tab().value} disabled={tab().disabled}>
              {tab().label}
            </TabsTrigger>
          )}
        </Index>
      </TabsList>
      <Index each={tabs}>
        {(tab) => (
          <TabsContent value={tab().value}>
            <div class="text-sm text-foreground">{tab().content}</div>
          </TabsContent>
        )}
      </Index>
    </Tabs>
  );
}
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>TabsBase.RootProvider</InlineCode> when you need to access the tabs state
        outside of the tabs tree. This pattern uses the <InlineCode>useTabs</InlineCode> hook from
        Ark UI to create a shared context that both the tabs and external elements can reference.
      </P>
      <TabsRootProviderDemo />
      <Pre>{`

import { TabsBase, TabsList, TabsTrigger, TabsContent } from "~/components/tabs";
import { useTabs } from "@ark-ui/solid/tabs";

const tabs = useTabs({ defaultValue: "overview" });

<TabsBase.RootProvider value={tabs}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="usage">...</TabsContent>
</TabsBase.RootProvider>
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Tabs</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained tabs.
        </li>
        <li>
          <strong>
            <InlineCode>TabsBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created tabs context via <InlineCode>useTabs</InlineCode>. Use when you
          need to read or control the tabs state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/tabs">Ark UI Tabs</A> documentation.
      </P>
    </>
  );
}
