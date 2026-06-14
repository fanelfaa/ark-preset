import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ScrollAreaBasicDemo from "@demos/scroll-area-demo/ScrollAreaBasicDemo.tsx";

export const Route = createFileRoute("/components/scroll-area")({ component: ScrollAreaPage });

function ScrollAreaPage() {
  return (
    <>
      <H1>ScrollArea</H1>
      <P>
        A scrollable container with custom scrollbar styling that provides a consistent look across
        browsers.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/scroll-area" />
      <ScrollAreaBasicDemo />
      <Pre>{`

import { ScrollArea } from "~/components/scroll-area";

export function ScrollAreaDemo() {
  return (
    <ScrollArea class="h-[200px] w-[350px]" orientation="vertical">
      <div class="p-4 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} class="text-sm">
            Item {i + 1}: Lorem ipsum dolor sit amet...
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add scroll-area
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/scroll-area.ts`:
        <Pre>{`import { tv, type VariantProps } from "tailwind-variants";

export const scrollAreaVariants = tv({
  slots: {
    viewport:
      "h-full w-full rounded-[inherit] overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:size-0",
    scrollbar: "flex select-none touch-none transition-colors group",
    thumb:
      "relative flex-1 rounded-full bg-border/40 transition-colors duration-150 group-hover:bg-border data-[dragging]:bg-border",
    corner: "bg-background",
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "w-2.5 border-l border-l-transparent p-px",
        thumb: "",
      },
      horizontal: {
        scrollbar: "flex-col h-2.5 border-t border-t-transparent p-px",
        thumb: "",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type ScrollAreaVariants = VariantProps<typeof scrollAreaVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/scroll-area/scroll-area.base.tsx`:
        <Pre>{`import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { splitProps, type Component } from "solid-js";
import { scrollAreaVariants } from "../recipes/scroll-area";

const styles = scrollAreaVariants();

const ScrollAreaRoot: Component<ArkScrollArea.RootProps> = (props) => {
  return <ArkScrollArea.Root {...props} />;
};

const ScrollAreaViewport: Component<ArkScrollArea.ViewportProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Viewport class={styles.viewport({ class: local.class })} {...others} />;
};

const ScrollAreaContent: Component<ArkScrollArea.ContentProps> = (props) => {
  return <ArkScrollArea.Content {...props} />;
};

const ScrollAreaScrollbar: Component<ArkScrollArea.ScrollbarProps & { orientation?: "vertical" | "horizontal" }> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <ArkScrollArea.Scrollbar
      class={styles.scrollbar({ class: local.class, orientation: local.orientation })}
      orientation={local.orientation}
      {...others}
    />
  );
};

const ScrollAreaThumb: Component<ArkScrollArea.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Thumb class={styles.thumb({ class: local.class })} {...others} />;
};

const ScrollAreaCorner: Component<ArkScrollArea.CornerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Corner class={styles.corner({ class: local.class })} {...others} />;
};

export const ScrollArea = {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
};`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/scroll-area/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { ScrollArea as ScrollAreaBase } from "./scroll-area.base";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";

type ScrollAreaProps = ArkScrollArea.RootProps & {
  orientation?: "vertical" | "horizontal";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children"]);
  return (
    <ScrollAreaBase.Root {...others}>
      <ScrollAreaBase.Viewport>
        <ScrollAreaBase.Content>
          {local.children}
        </ScrollAreaBase.Content>
      </ScrollAreaBase.Viewport>
      <ScrollAreaBase.Scrollbar orientation={local.orientation ?? "vertical"}>
        <ScrollAreaBase.Thumb />
      </ScrollAreaBase.Scrollbar>
      <ScrollAreaBase.Corner />
    </ScrollAreaBase.Root>
  );
};

export { ScrollArea, ScrollAreaBase };

export { scrollAreaVariants, type ScrollAreaVariants } from "../recipes/scroll-area";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component:</P>
      <Pre>{`

import { ScrollArea } from "~/components/scroll-area";
      `}</Pre>
      <P>Basic vertical scroll:</P>
      <Pre>{`

<ScrollArea class="h-[200px] w-[350px]" orientation="vertical">
  <div class="p-4">
    <p>Long content here...</p>
  </div>
</ScrollArea>
      `}</Pre>
      <P>Horizontal scroll:</P>
      <Pre>{`

<ScrollArea class="w-[350px]" orientation="horizontal">
  <div class="flex w-[800px] p-4">
    <p>Wide content here...</p>
  </div>
</ScrollArea>
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        For full control over the scroll area structure, import the primitive parts via{" "}
        <InlineCode>ScrollAreaBase</InlineCode>:
      </P>
      <Pre>{`

import { ScrollArea, ScrollAreaBase } from "~/components/scroll-area";

// ScrollAreaBase provides direct access to parts:
// ScrollAreaBase.Root, ScrollAreaBase.Viewport, ScrollAreaBase.Content,
// ScrollAreaBase.Scrollbar, ScrollAreaBase.Thumb, ScrollAreaBase.Corner
      `}</Pre>
      <P>
        See the <A href="#manual">Manual</A> installation section for example usage of the primitive
        parts.
      </P>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/scroll-area">Ark UI ScrollArea</A>{" "}
        documentation.
      </P>
    </>
  );
}
