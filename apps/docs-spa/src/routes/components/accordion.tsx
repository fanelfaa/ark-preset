import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import AccordionBasicDemo from "@demos/accordion-demo/AccordionBasicDemo.tsx";
import AccordionMultipleDemo from "@demos/accordion-demo/AccordionMultipleDemo.tsx";
import AccordionDisabledDemo from "@demos/accordion-demo/AccordionDisabledDemo.tsx";
import AccordionRootProviderDemo from "@demos/accordion-demo/AccordionRootProviderDemo.tsx";

export const Route = createFileRoute("/components/accordion")({ component: AccordionPage });

function AccordionPage() {
  return (
    <>
      <H1>Accordion</H1>
      <P>Displays collapsible content panels that reveal or hide sections of content.</P>
      <DocsLink href="https://ark-ui.com/docs/components/accordion" />
      <AccordionBasicDemo />
      <Pre>{`

import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "~/components/accordion";

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionItemTrigger>
          Is it accessible?
        </AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Yes. It adheres to the WAI-ARIA design pattern.</div>
        </AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionItemTrigger>
          Is it styled?
        </AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">
            Yes. It comes with default styles that match the other components.
          </div>
        </AccordionItemContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionItemTrigger>
          Is it animated?
        </AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Yes. It's animated by default, but you can disable it.</div>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add accordion
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/accordion.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const accordionVariants = tv({
  slots: {
    root: "w-full",
    item: "border-b border-border",
    itemTrigger:
      "flex w-full items-center justify-between gap-2 py-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    itemIndicator:
      "size-4 shrink-0 text-foreground transition-transform duration-200 data-[state=open]:rotate-180",
    itemContent:
      "overflow-hidden transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    itemBody: "pb-4 text-sm text-foreground",
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/accordion/accordion.base.tsx`:
        <Pre>{`import { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import { splitProps, type Component } from "solid-js";
import { accordionVariants } from "../recipes/accordion";

const styles = accordionVariants();

const Root: Component<ArkAccordion.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkAccordion.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Item: Component<ArkAccordion.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAccordion.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemTrigger class={styles.itemTrigger({ class: local.class })} {...others} />
  );
};

const ItemContent: Component<ArkAccordion.ItemContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemContent class={styles.itemContent({ class: local.class })} {...others} />
  );
};

const ItemIndicator: Component<ArkAccordion.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkAccordion.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

export const Accordion = { Root, RootProvider, Item, ItemTrigger, ItemContent, ItemIndicator };`}</Pre>
        `src/components/accordion/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { Accordion as AccordionBase } from "./accordion.base";
import type { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";

const Accordion: Component<ArkAccordion.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <AccordionBase.Root class={local.class} {...others}>
      {local.children}
    </AccordionBase.Root>
  );
};

const AccordionItem = AccordionBase.Item;

const AccordionItemTrigger: Component<ArkAccordion.ItemTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <AccordionBase.ItemTrigger class={local.class} {...others}>
      <AccordionBase.ItemIndicator />
      {local.children}
    </AccordionBase.ItemTrigger>
  );
};

const AccordionItemContent = AccordionBase.ItemContent;

export {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionBase,
};

export { accordionVariants, type AccordionVariants } from "../recipes/accordion";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--ring</InlineCode>, <InlineCode>--border</InlineCode>,{" "}
        <InlineCode>--background</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionBase,
} from "~/components/accordion";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Accordion>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>
      Section Title
    </AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">Content goes here.</div>
    </AccordionItemContent>
  </AccordionItem>
</Accordion>
      `}</Pre>
      <P>With multiple items:</P>
      <Pre>{`

<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>
      First Section
    </AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">First content.</div>
    </AccordionItemContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionItemTrigger>
      Second Section
    </AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">Second content.</div>
    </AccordionItemContent>
  </AccordionItem>
</Accordion>
      `}</Pre>
      <H2>Multiple</H2>
      <P>
        Use the <InlineCode>multiple</InlineCode> prop to allow more than one item to be expanded at
        the same time.
      </P>
      <AccordionMultipleDemo />
      <Pre>{`

<Accordion multiple defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>
      Can I open multiple items?
    </AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">
        Yes. Just pass the <code>multiple</code> prop.
      </div>
    </AccordionItemContent>
  </AccordionItem>
  {/* ... more items */}
</Accordion>
      `}</Pre>
      <H2>Controlled</H2>
      <P>
        Control the expanded state programmatically using <InlineCode>value</InlineCode> and{" "}
        <InlineCode>onValueChange</InlineCode>.
      </P>
      <Pre>{`

import { createSignal } from "solid-js";
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "~/components/accordion";

export function AccordionControlled() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <Accordion value={value()} onValueChange={(details) => setValue(details.value)}>
      <AccordionItem value="item-1">
        <AccordionItemTrigger>
      Controlled Item
    </AccordionItemTrigger>
        <AccordionItemContent>
          <div class="pb-4 text-sm">Current state: {value().join(", ") || "closed"}</div>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  );
}
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>AccordionRootProvider</InlineCode> when you need to access the accordion
        state outside of the accordion tree. This pattern uses the{" "}
        <InlineCode>useAccordion</InlineCode> hook from Ark UI to create a shared context that both
        the accordion and external elements can reference.
      </P>
      <AccordionRootProviderDemo />
      <Pre>{`

import { useAccordion } from "@ark-ui/solid/accordion";
import {
  AccordionBase,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "~/components/accordion";

export function AccordionWithExternalControl() {
  const accordion = useAccordion({ multiple: true, defaultValue: ["item-1"] });

  return (
    <div>
      {/* Access accordion state outside the tree */}
      <output>Value: {JSON.stringify(accordion().value)}</output>

      <AccordionBase.RootProvider value={accordion}>
        <AccordionItem value="item-1">
          <AccordionItemTrigger>
      Section One
    </AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm">Content for section one.</div>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionItemTrigger>
      Section Two
    </AccordionItemTrigger>
          <AccordionItemContent>
            <div class="pb-4 text-sm">Content for section two.</div>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Accordion</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained accordions.
        </li>
        <li>
          <strong>
            <InlineCode>AccordionRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created accordion context via <InlineCode>useAccordion</InlineCode>. Use
          when you need to read or control the accordion state from outside the component tree.
        </li>
      </List>
      <H2>Disabled</H2>
      <P>Disable individual items or the entire accordion.</P>
      <AccordionDisabledDemo />
      <Pre>{`

<Accordion>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>Active Item</AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">This item is interactive.</div>
    </AccordionItemContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionItemTrigger>Disabled Item</AccordionItemTrigger>
    <AccordionItemContent>
      <div class="pb-4 text-sm">This item is disabled.</div>
    </AccordionItemContent>
  </AccordionItem>
</Accordion>
      `}</Pre>
      <P>
        To disable all items at once, pass <InlineCode>disabled</InlineCode> to the{" "}
        <InlineCode>{`<Accordion>`}</InlineCode> root.
      </P>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/accordion">Ark UI Accordion</A>{" "}
        documentation.
      </P>
    </>
  );
}
