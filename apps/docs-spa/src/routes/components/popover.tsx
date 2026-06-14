import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import PopoverBasicDemo from "@demos/popover-demo/PopoverBasicDemo.tsx";
import PopoverRootProviderDemo from "@demos/popover-demo/PopoverRootProviderDemo.tsx";

export const Route = createFileRoute("/components/popover")({ component: PopoverPage });

function PopoverPage() {
  return (
    <>
      <H1>Popover</H1>
      <P>
        A floating panel that displays content when triggered by a user action, typically a button
        click.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/popover" />
      <PopoverBasicDemo />
      <Pre>{`

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "~/components/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger>Open Popover</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>
          This is a popover description. It can contain any content you want.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add popover
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/popover.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const popoverVariants = tv({
  slots: {
    root: "relative inline-flex",
    positioner: "fixed z-50",
    content:
      "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative",
    title: "text-lg font-semibold leading-none tracking-tight mb-1",
    description: "text-sm text-muted-foreground",
    closeTrigger:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
    arrow: "",
    arrowTip: "h-2 w-2 border-t border-l border-border bg-popover",
    indicator: "h-4 w-4",
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/popover/popover.base.tsx`:
        <Pre>{`import { Popover as ArkPopover } from '@ark-ui/solid/popover'
import { splitProps, type Component } from 'solid-js'
import { popoverVariants, type PopoverVariants } from './recipes/popover'
import { buttonVariants, type ButtonVariants } from './recipes/button'

const styles = popoverVariants()

const Root = ArkPopover.Root
const RootProvider = ArkPopover.RootProvider
const Trigger: Component<ArkPopover.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size']);
  return (
    <ArkPopover.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

const Content: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkPopover.Content
      class={styles.content({ class: local.class })}
      style={\`--arrow-size: 10px; \${local.style}\`}
      {...others}
    />
  );
};

const Title: Component<ArkPopover.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Title class={styles.title({ class: local.class })} {...others} />;
};

const Description: Component<ArkPopover.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Description class={styles.description({ class: local.class })} {...others} />;
};

const CloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />
  );
};

const Arrow: Component<ArkPopover.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkPopover.Arrow class={styles.arrow({ class: local.class })} {...others}>
      <ArkPopover.ArrowTip class={styles.arrowTip()} />
    </ArkPopover.Arrow>
  );
};

const Indicator: Component<ArkPopover.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkPopover.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPopover.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

export const Popover = {
  Root,
  RootProvider,
  Trigger,
  Content,
  Title,
  Description,
  CloseTrigger,
  Arrow,
  Indicator,
  Positioner,
};`}</Pre>
        `src/components/popover/index.tsx`:
        <Pre>{`import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { Popover as PopoverBase } from "./popover.base";
import { popoverVariants, type PopoverVariants } from "../recipes/popover";

export const PopoverCloseTrigger: Component<ArkPopover.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <PopoverBase.CloseTrigger class={local.class} {...others}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
    </PopoverBase.CloseTrigger>
  );
};

export const PopoverContent: Component<ArkPopover.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <PopoverBase.Positioner>
        <PopoverBase.Content class={local.class} {...others}>
          <PopoverBase.Arrow />
          {local.children}
          <PopoverCloseTrigger />
        </PopoverBase.Content>
      </PopoverBase.Positioner>
    </Portal>
  );
};

const Popover = PopoverBase.Root;
const PopoverTrigger = PopoverBase.Trigger;
const PopoverTitle = PopoverBase.Title;
const PopoverDescription = PopoverBase.Description;
const PopoverArrow = PopoverBase.Arrow;

export { Popover, PopoverTrigger, PopoverTitle, PopoverDescription, PopoverArrow, PopoverBase };

export { popoverVariants, type PopoverVariants };`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--popover</InlineCode>, <InlineCode>--foreground</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "~/components/popover";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Popover>
  <PopoverTrigger>Open Popover</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Title</PopoverTitle>
    <PopoverDescription>Description text</PopoverDescription>
  </PopoverContent>
</Popover>
      `}</Pre>
      <Blockquote>
        <strong>Note:</strong> <InlineCode>PopoverArrow</InlineCode> and{" "}
        <InlineCode>PopoverCloseTrigger</InlineCode> are automatically included inside{" "}
        <InlineCode>PopoverContent</InlineCode>. You only need to import them separately for custom
        positioning or advanced use cases.
      </Blockquote>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>PopoverRootProvider</InlineCode> when you need to access the popover state
        outside of the component tree. This pattern uses the <InlineCode>usePopover</InlineCode>{" "}
        hook from Ark UI to create a shared context that both the popover and external elements can
        reference.
      </P>
      <PopoverRootProviderDemo />
      <Pre>{`

import { usePopover } from "@ark-ui/solid/popover";
import {
  PopoverContent,
  PopoverTrigger,
  PopoverTitle,
  PopoverDescription,
  PopoverBase,
} from "~/components/popover";
export function PopoverWithExternalControl() {
  const popover = usePopover();

  return (
    <div>
      <output>Open: {JSON.stringify(popover().open)}</output>

      <PopoverBase.RootProvider value={popover}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This popover state is managed externally via <code>usePopover</code>.
          </PopoverDescription>
        </PopoverContent>
      </PopoverBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Popover</InlineCode>
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained popovers.
        </li>
        <li>
          <strong>
            <InlineCode>PopoverBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created popover context via <InlineCode>usePopover</InlineCode>. Use when
          you need to read or control the popover state from outside the component tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/popover">Ark UI Popover</A>{" "}
        documentation.
      </P>
    </>
  );
}
