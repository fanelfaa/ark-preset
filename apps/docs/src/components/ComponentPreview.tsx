import { createUniqueId, splitProps, type JSX } from "solid-js";
import CodeBlock from "./CodeBlock";

/**
 * ComponentPreview — unified demo card.
 *
 * Renders a live demo on top and its source code below, all inside one
 * bordered card.
 *
 * Styling note: every MDX page is already wrapped in a `.prose` root by
 * `mdx-provider` (the `Root` builtin), so code blocks are styled by the
 * Tailwind typography plugin (`.prose pre`). `not-prose` is scoped to the
 * preview area ONLY so the code section below inherits that typography
 * styling exactly like regular MDX code blocks (e.g. the installation
 * snippets) — no need to repeat `prose` classes here.
 *
 * Usage (in MDX):
 *
 *   import XxxDemo from "@demos/x-demo/XxxDemo.tsx";
 *   import XxxDemoCode from "@demos/x-demo/XxxDemo.tsx?code";
 *
 *   <ComponentPreview code={XxxDemoCode}>
 *     <XxxDemo />
 *   </ComponentPreview>
 *
 * The `class` prop applies to the preview area for layout (e.g. "flex flex-wrap gap-4").
 */
interface ComponentPreviewProps {
  /** Transformed demo source (from a `?code` import). */
  code: string;
  /** Layout classes for the preview area (e.g. "flex flex-wrap gap-4"). */
  class?: string;
  children?: JSX.Element;
}

export function ComponentPreview(props: ComponentPreviewProps) {
  // Unique id per card so multiple previews on one page keep valid aria relationships
  const panelId = createUniqueId();
  const [local] = splitProps(props, ["code", "class", "children"]);

  return (
    <div class="relative z-2 overflow-hidden rounded-2xl md:rounded-3xl border border-border">
      {/* Preview area — protected from prose typography styles.
          Frosted glass (bg + backdrop-blur) is scoped HERE, to the demo only:
          the code panel below is a translucent layer (dark mode pre-bg is
          #00000080), so a nested backdrop-filter card inside the page's own
          frosted <main> makes Firefox band the fade gradient and mislayer the
          code. One blur layer (like plain MDX code blocks) renders cleanly. */}
      <div
        class={`not-prose bg-background/70 backdrop-blur-3xl p-4 relative z-10 md:p-6${local.class ? ` ${local.class}` : ""}`}
      >
        {local.children}
      </div>

      {/* Code section — styled by the typography plugin exactly like MDX code blocks */}
      <div id={panelId} class="[&_pre]:my-0">
        <CodeBlock lang="tsx">{local.code}</CodeBlock>
      </div>
    </div>
  );
}
