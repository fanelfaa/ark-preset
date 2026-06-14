import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import TooltipBasicDemo from "@demos/tooltip-demo/TooltipBasicDemo.tsx";
import TooltipArrowDemo from "@demos/tooltip-demo/TooltipArrowDemo.tsx";
import TooltipManualArrowDemo from "@demos/tooltip-demo/TooltipManualArrowDemo.tsx";
import TooltipControlledDemo from "@demos/tooltip-demo/TooltipControlledDemo.tsx";

export const Route = createFileRoute("/components/tooltip")({ component: TooltipPage });

function TooltipPage() {
  return (
    <>
      <H1>Tooltip</H1>
      <P>
        A popup component that displays contextual information when hovering or focusing on a
        trigger element.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/tooltip" />
      <TooltipBasicDemo />
      <Pre lang="tsx">{`

import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>This is a basic tooltip</TooltipContent>
    </Tooltip>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add tooltip
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/tooltip.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const tooltipVariants = tv({
  slots: {
    root: "inline-flex",
    positioner: "z-50",
    content:
      "z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    arrow: "",
    arrowTip: "h-2 w-2 border-t border-l border-border bg-popover",
  },
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the base component file at `src/components/tooltip/tooltip.base.tsx`:
        <Pre lang="tsx">{`import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { splitProps, type Component } from "solid-js";
import { tooltipVariants } from "../../recipes/tooltip";
import { buttonVariants, type ButtonVariants } from "../../recipes/button";

const styles = tooltipVariants();

const Root = ArkTooltip.Root;
const RootProvider = ArkTooltip.RootProvider;

const Trigger: Component<ArkTooltip.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ArkTooltip.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  );
};

const Positioner: Component<ArkTooltip.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Content: Component<ArkTooltip.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkTooltip.Content
      class={styles.content({ class: local.class })}
      {...others}
      style={\`--arrow-size: 10px; \${local.style}\`}
    />
  );
};

const Arrow: Component<ArkTooltip.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkTooltip.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTooltip.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

export const Tooltip = {
  Root,
  RootProvider,
  Trigger,
  Positioner,
  Content,
  Arrow,
  ArrowTip,
};`}</Pre>
        Then create the composite component file at `src/components/tooltip/index.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from "solid-js";
import { Tooltip as TooltipBase } from "./tooltip.base";
import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";

const Tooltip = TooltipBase.Root;
const TooltipTrigger = TooltipBase.Trigger;

type TooltipContentProps = ArkTooltip.ContentProps & {
  /** When true, renders an arrow pointing to the trigger element */
  useArrow?: boolean;
};

const TooltipContent: Component<TooltipContentProps> = (props) => {
  const [local, others] = splitProps(props, ["useArrow", "children"]);
  return (
    <TooltipBase.Positioner>
      <TooltipBase.Content {...others}>
        {local.useArrow && (
          <TooltipBase.Arrow>
            <TooltipBase.ArrowTip />
          </TooltipBase.Arrow>
        )}
        {local.children}
      </TooltipBase.Content>
    </TooltipBase.Positioner>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipBase };

export { tooltipVariants, type TooltipVariants } from "../../recipes/tooltip";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--popover</InlineCode>, <InlineCode>--popover-foreground</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, <InlineCode>--ring</InlineCode>, etc.) or override the
        utility classes to match your design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/tooltip";
      `}</Pre>
      <P>Basic tooltip:</P>
      <Pre lang="tsx">{`

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip content</TooltipContent>
</Tooltip>
      `}</Pre>
      <H2>With Arrow</H2>
      <P>Add an arrow pointing to the trigger element.</P>
      <TooltipArrowDemo />
      <Pre lang="tsx">{`

import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/tooltip";

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent useArrow>
    Tooltip with arrow
  </TooltipContent>
</Tooltip>;
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>Tooltip</InlineCode> doesn't provide enough control, import
        the raw primitive parts via <InlineCode>TooltipBase</InlineCode>:
      </P>
      <Pre lang="tsx">{`

import { TooltipBase } from "~/components/tooltip";
      `}</Pre>
      <P>Or import directly from the base file:</P>
      <Pre lang="tsx">{`

import { Tooltip } from "~/components/tooltip/tooltip.base";
      `}</Pre>
      <H3>Manual Arrow Composition</H3>
      <P>
        For custom arrow styling or positioning, compose the parts manually using{" "}
        <InlineCode>TooltipBase</InlineCode>:
      </P>
      <TooltipManualArrowDemo />
      <Pre lang="tsx">{`

import { Tooltip, TooltipBase } from "~/components/tooltip";

<Tooltip>
  <TooltipBase.Trigger>Hover me</TooltipBase.Trigger>
  <TooltipBase.Positioner>
    <TooltipBase.Content>
      <TooltipBase.Arrow class="[--arrow-size:14px]">
        <TooltipBase.ArrowTip />
      </TooltipBase.Arrow>
      Custom arrow size
    </TooltipBase.Content>
  </TooltipBase.Positioner>
</Tooltip>
      `}</Pre>
      <H3>Controlled Open State</H3>
      <P>
        Use <InlineCode>open</InlineCode> and <InlineCode>onOpenChange</InlineCode> to control the
        tooltip visibility externally:
      </P>
      <TooltipControlledDemo />
      <Pre lang="tsx">{`

import { createSignal } from "solid-js";
import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/tooltip";

export function ControlledTooltip() {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="space-y-2">
      <button onClick={() => setOpen((v) => !v)}>
        {open() ? "Close" : "Open"} tooltip
      </button>
      <Tooltip open={open()} onOpenChange={(e) => setOpen(e.open)}>
        <TooltipTrigger>Hover or click above</TooltipTrigger>
        <TooltipContent>Controlled tooltip</TooltipContent>
      </Tooltip>
    </div>
  );
}
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/tooltip">Ark UI Tooltip</A>{" "}
        documentation.
      </P>
    </>
  );
}
