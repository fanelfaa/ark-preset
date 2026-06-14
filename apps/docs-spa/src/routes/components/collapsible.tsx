import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import CollapsibleBasicDemo from "@demos/collapsible-demo/CollapsibleBasicDemo.tsx";
import CollapsibleRootProviderDemo from "@demos/collapsible-demo/CollapsibleRootProviderDemo.tsx";

export const Route = createFileRoute("/components/collapsible")({ component: CollapsiblePage });

function CollapsiblePage() {
  return (
    <>
      <H1>Collapsible</H1>
      <P>A component that allows users to expand or collapse content sections.</P>
      <DocsLink href="https://ark-ui.com/docs/components/collapsible" />
      <CollapsibleBasicDemo />
      <Pre>{`

import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/collapsible";

export function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        Click to expand
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="pt-4 text-sm">This is the collapsible content.</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add collapsible
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/collapsible.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const collapsibleVariants = tv({
  slots: {
    root: "w-full",
    trigger:
      "flex items-center justify-between gap-3 w-full p-2.5 text-sm font-medium border border-neutral-200 rounded-lg bg-transparent cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
    content:
      "overflow-hidden data-enter:animate-collapsible-down data-end:animate-collapsible-up duration-500",
    indicator: "size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90",
  },
});

export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/collapsible/collapsible.base.tsx`:
        <Pre>{`import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";
import { splitProps, type Component } from "solid-js";
import { collapsibleVariants } from "../recipes/collapsible";

const styles = collapsibleVariants();

const Root: Component<ArkCollapsible.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkCollapsible.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCollapsible.RootProvider class={styles.root({ class: local.class })} {...others} />
  );
};

const Trigger: Component<ArkCollapsible.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Content: Component<ArkCollapsible.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Content class={styles.content({ class: local.class })} {...others} />;
};

const Indicator: Component<ArkCollapsible.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const Collapsible = { Root, RootProvider, Trigger, Content, Indicator };`}</Pre>
        `src/components/collapsible/index.tsx`:
        <Pre>{`import { type Component } from "solid-js";
import { Collapsible as CollapsibleBase } from "./collapsible.base";
import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";

const Collapsible = CollapsibleBase.Root;

const CollapsibleIndicator: Component<ArkCollapsible.IndicatorProps> = (props) => {
  return (
    <CollapsibleBase.Indicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </CollapsibleBase.Indicator>
  );
};

const CollapsibleTrigger = CollapsibleBase.Trigger;
const CollapsibleContent = CollapsibleBase.Content;

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
  CollapsibleBase,
};

export { collapsibleVariants, type CollapsibleVariants } from "../recipes/collapsible";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--border</InlineCode>, etc.) or override
        the utility classes to match your design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/collapsible";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Collapsible>
  <CollapsibleTrigger>
    Click to expand
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div class="pt-4 text-sm">Hidden content goes here.</div>
  </CollapsibleContent>
</Collapsible>
      `}</Pre>
      <H2>With Indicator</H2>
      <P>
        The indicator rotates when the content is expanded. Use{" "}
        <InlineCode>CollapsibleIndicator</InlineCode> inside the trigger to show the chevron icon.
        The rotation is styled via the <InlineCode>indicator</InlineCode> slot in the recipe.
      </P>
      <Pre>{`

import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/collapsible";

<Collapsible>
  <CollapsibleTrigger>
    Toggle Content
    <CollapsibleIndicator />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div class="pt-4 text-sm">The indicator automatically rotates when expanded.</div>
  </CollapsibleContent>
</Collapsible>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>CollapsibleRootProvider</InlineCode> when you need to access the collapsible
        state outside of the component tree. This pattern uses the{" "}
        <InlineCode>useCollapsible</InlineCode> hook from Ark UI to create a shared context that
        both the component and external elements can reference.
      </P>
      <CollapsibleRootProviderDemo />
      <Pre>{`

import { useCollapsible } from "@ark-ui/solid/collapsible";
import {
  CollapsibleBase,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/collapsible";

export function ExternalControlExample() {
  const collapsible = useCollapsible({ defaultOpen: true });

  return (
    <div>
      <output>Open: {JSON.stringify(collapsible().open)}</output>

      <CollapsibleBase.RootProvider value={collapsible}>
        <CollapsibleTrigger>
          Click to expand
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="pt-4 text-sm">Content goes here.</div>
        </CollapsibleContent>
      </CollapsibleBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Collapsible</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained usage.
        </li>
        <li>
          <strong>
            <InlineCode>CollapsibleRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created context via <InlineCode>useCollapsible</InlineCode>. Use when you
          need to read or control the collapsible state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/collapsible">Ark UI Collapsible</A>{" "}
        documentation.
      </P>
    </>
  );
}
