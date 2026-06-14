import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import HoverCardBasicDemo from "@demos/hover-card-demo/HoverCardBasicDemo.tsx";
import HoverCardControlledDemo from "@demos/hover-card-demo/HoverCardControlledDemo.tsx";
import HoverCardDelayDemo from "@demos/hover-card-demo/HoverCardDelayDemo.tsx";
import HoverCardPositioningDemo from "@demos/hover-card-demo/HoverCardPositioningDemo.tsx";
import HoverCardRootProviderDemo from "@demos/hover-card-demo/HoverCardRootProviderDemo.tsx";
import HoverCardArrowDemo from "@demos/hover-card-demo/HoverCardArrowDemo.tsx";

export const Route = createFileRoute("/components/hover-card")({ component: HoverCardPage });

function HoverCardPage() {
  return (
    <>
      <H1>Hover Card</H1>
      <P>
        A popup card that appears when the user hovers over a trigger element, displaying additional
        information or actions without leaving the current context.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/hover-card" />
      <HoverCardBasicDemo />
      <Pre>{`

import { HoverCard, HoverCardTrigger, HoverCardContent } from "~/components/hover-card";

export default function HoverCardBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent useArrow>
            <div class="text-sm">
              The content of this hover card is displayed when you hover over the trigger element.
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add hover-card
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/hover-card.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const hoverCardVariants = tv({
  slots: {
    root: "inline-flex",
    trigger:
      "inline-flex items-center justify-center gap-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    positioner: "z-50",
    content:
      "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    arrow: "",
    arrowTip: "h-2 w-2 border-t border-l border-border bg-popover",
  },
});

export type HoverCardVariants = VariantProps<typeof hoverCardVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the base component file at `src/components/hover-card/hover-card.base.tsx`:
        <Pre>{`import { HoverCard as ArkHoverCard } from "@ark-ui/solid/hover-card";
import { splitProps, type Component } from "solid-js";
import { hoverCardVariants } from "../../recipes/hover-card";

const styles = hoverCardVariants();

const Root = ArkHoverCard.Root;
const RootProvider = ArkHoverCard.RootProvider;

const Trigger: Component<ArkHoverCard.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkHoverCard.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Content: Component<ArkHoverCard.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "style"]);
  return (
    <ArkHoverCard.Content
      class={styles.content({ class: local.class })}
      {...others}
      style={\`--arrow-size: 10px; \${local.style}\`}
    />
  );
};

const Arrow: Component<ArkHoverCard.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkHoverCard.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkHoverCard.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

export const HoverCard = {
  Root,
  RootProvider,
  Trigger,
  Positioner,
  Content,
  Arrow,
  ArrowTip,
};`}</Pre>
        Then create the composite component file at `src/components/hover-card/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { HoverCard as HoverCardBase } from "./hover-card.base";
import { HoverCard as ArkHoverCard } from "@ark-ui/solid/hover-card";

const HoverCard = HoverCardBase.Root;
const HoverCardTrigger = HoverCardBase.Trigger;

type HoverCardContentProps = ArkHoverCard.ContentProps & {
  /** When true, renders an arrow pointing to the trigger element */
  useArrow?: boolean;
};

const HoverCardContent: Component<HoverCardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["useArrow", "children"]);
  return (
    <HoverCardBase.Positioner>
      <HoverCardBase.Content {...others}>
        {local.useArrow && (
          <HoverCardBase.Arrow>
            <HoverCardBase.ArrowTip />
          </HoverCardBase.Arrow>
        )}
        {local.children}
      </HoverCardBase.Content>
    </HoverCardBase.Positioner>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardBase };

export { hoverCardVariants, type HoverCardVariants } from "../../recipes/hover-card";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--popover</InlineCode>, <InlineCode>--popover-foreground</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, <InlineCode>--ring</InlineCode>, etc.) or override the
        utility classes to match your design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import { HoverCard, HoverCardTrigger, HoverCardContent } from "~/components/hover-card";
      `}</Pre>
      <P>Basic hover card:</P>
      <Pre>{`

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent useArrow>
    <div>Content displayed on hover</div>
  </HoverCardContent>
</HoverCard>
      `}</Pre>
      <H3>Controlled Open State</H3>
      <HoverCardControlledDemo />
      <P>
        Use <InlineCode>open</InlineCode> and <InlineCode>onOpenChange</InlineCode> to control the
        hover card visibility externally:
      </P>
      <Pre>{`

import { createSignal } from "solid-js";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "~/components/hover-card";

function ControlledHoverCard() {
  const [open, setOpen] = createSignal(false);
  return (
    <HoverCard open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>Controlled hover card</HoverCardContent>
    </HoverCard>
  );
}
      `}</Pre>
      <H3>Custom Delay</H3>
      <HoverCardDelayDemo />
      <P>Adjust the hover open and close delays:</P>
      <Pre>{`

<HoverCard openDelay={200} closeDelay={100}>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Custom delay (200ms open, 100ms close)</HoverCardContent>
</HoverCard>
      `}</Pre>
      <H3>Custom Positioning</H3>
      <HoverCardPositioningDemo />
      <P>Position the hover card at different sides:</P>
      <Pre>{`

<HoverCard positioning={{ placement: "right" }}>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    Positioned to the right
  </HoverCardContent>
</HoverCard>
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>HoverCard</InlineCode> does not provide enough control,
        import the raw primitive parts via <InlineCode>HoverCardBase</InlineCode>:
      </P>
      <Pre>{`

import { HoverCardBase } from "~/components/hover-card";
      `}</Pre>
      <P>Or import directly from the base file:</P>
      <Pre>{`

import { HoverCard } from "~/components/hover-card/hover-card.base";
      `}</Pre>
      <H3>RootProvider Pattern</H3>
      <HoverCardRootProviderDemo />
      <P>
        For machine-controlled usage with <InlineCode>useHoverCard</InlineCode>:
      </P>
      <Pre>{`

import { useHoverCard } from "@ark-ui/solid/hover-card";
import { HoverCardBase } from "~/components/hover-card";

const machine = useHoverCard({ open: true });

<HoverCardBase.RootProvider value={machine}>
  <HoverCardBase.Trigger>Hover me</HoverCardBase.Trigger>
  <HoverCardBase.Positioner>
    <HoverCardBase.Content>
      Content controlled via machine
    </HoverCardBase.Content>
  </HoverCardBase.Positioner>
</HoverCardBase.RootProvider>
      `}</Pre>
      <H3>Custom Arrow</H3>
      <HoverCardArrowDemo />
      <P>
        For custom arrow styling or positioning, compose the parts manually using{" "}
        <InlineCode>HoverCardBase</InlineCode>:
      </P>
      <Pre>{`

import { HoverCard, HoverCardBase } from "~/components/hover-card";

<HoverCard>
  <HoverCardBase.Trigger>Hover me</HoverCardBase.Trigger>
  <HoverCardBase.Positioner>
    <HoverCardBase.Content>
      <HoverCardBase.Arrow class="[--arrow-size:14px]">
        <HoverCardBase.ArrowTip />
      </HoverCardBase.Arrow>
      Custom arrow size
    </HoverCardBase.Content>
  </HoverCardBase.Positioner>
</HoverCard>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/hover-card">Ark UI Hover Card</A>{" "}
        documentation.
      </P>
    </>
  );
}
