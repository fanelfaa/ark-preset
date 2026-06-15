import { splitProps, For, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type HTMLArkProps, ark } from "@ark-ui/solid/factory";
import { marked } from "marked";
import type { Token, Tokens } from "marked";
import CodeBlock from "../CodeBlock";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  InlineCode,
  Blockquote,
  List,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@fan-ui/solid";
import { Table as TableBase } from "@fan-ui/solid";

// ── Re-export typography components from @fan-ui/solid ──────────────
export {
  H1,
  H2,
  H3,
  H4,
  P,
  InlineCode,
  Blockquote,
  List,
};
export { Lead, Large, Small, Muted } from "@fan-ui/solid";
export {
  TableHeader as THead,
  TableBody as TBody,
  TableHead as Th,
  TableCell as Td,
  TableRow as Tr,
};

// ── Link ────────────────────────────────────────────────────────
interface AProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Markdown link component.
 * External links (absolute) open in new tab with a subtle icon.
 * Internal links use normal navigation.
 */
export const A: Component<AProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children", "href"]);
  const isExternal = local.href?.startsWith("http") ?? false;

  return (
    <a
      href={local.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      class={`font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors${
        local.class ? ` ${local.class}` : ""
      }`}
      {...rest}
    >
      {local.children}
    </a>
  );
};

// ── Code Block (Pre) ────────────────────────────────────────────
/**
 * Code block component wrapping CodeBlock for code fences.
 * Use in place of <pre> when converting markdown code blocks.
 */
export const Pre = CodeBlock;

// ── Horizontal Rule ─────────────────────────────────────────────
export const Hr: Component = () => <hr class="my-6 border-border" />;

// ── Image ──────────────────────────────────────────────────────
interface ImgProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const Img: Component<ImgProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <img
      class={`rounded-lg border border-border${local.class ? ` ${local.class}` : ""}`}
      {...rest}
    />
  );
};

// ── Table (wrapper with overflow scroll + @fan-ui/solid Table) ─────
type TableProps = HTMLArkProps<"table">;

export const Table: Component<TableProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class="my-6 w-full overflow-y-auto">
      <TableBase class={local.class} {...rest} />
    </div>
  );
};

// ── Markdown Renderer ──────────────────────────────────────────

// ── Type guards ───────────────────────────────────────────────

function isHeading(t: Token): t is Tokens.Heading {
  return t.type === "heading";
}
function isParagraph(t: Token): t is Tokens.Paragraph {
  return t.type === "paragraph";
}
function isCode(t: Token): t is Tokens.Code {
  return t.type === "code";
}
function isBlockquote(t: Token): t is Tokens.Blockquote {
  return t.type === "blockquote";
}
function isList(t: Token): t is Tokens.List {
  return t.type === "list";
}
function isTable(t: Token): t is Tokens.Table {
  return t.type === "table";
}
function isHr(t: Token): t is Tokens.Hr {
  return t.type === "hr" || t.type === "thematicBreak";
}
function isSpace(t: Token): t is Tokens.Space {
  return t.type === "space";
}
function isText(t: Token): t is Tokens.Text {
  return t.type === "text";
}
function isStrong(t: Token): t is Tokens.Strong {
  return t.type === "strong";
}
function isEm(t: Token): t is Tokens.Em {
  return t.type === "em";
}
function isCodespan(t: Token): t is Tokens.Codespan {
  return t.type === "codespan";
}
function isLink(t: Token): t is Tokens.Link {
  return t.type === "link";
}
function isImage(t: Token): t is Tokens.Image {
  return t.type === "image";
}
function isBr(t: Token): t is Tokens.Br {
  return t.type === "br";
}
function isDel(t: Token): t is Tokens.Del {
  return t.type === "del";
}
function isHtml(t: Token): t is Tokens.HTML {
  return t.type === "html";
}

// ── Custom component embedding ───────────────────────────────

/** Extracted from an HTML token that looks like a JSX component tag. */
interface ParsedTag {
  tagName: string;
  props: Record<string, string | number | boolean>;
  innerMarkdown: string | null; // null = self-closing
}

/** Map of user-provided custom components to inject into markdown. */
type ComponentMap = Record<string, Component<any>>;

// Module-level variable set before each render pass (safe — Solid renders synchronously)
let _components: ComponentMap = {};

/** Parse JSX-like attributes from a string: key="val", key={expr}, key (bool). */
function parseAttrs(attrsStr: string): Record<string, string | number | boolean> {
  const props: Record<string, string | number | boolean> = {};
  // Match key="val" | key='val' | key={expr} | key (bare bool)
  const re =
    /([a-zA-Z_]\w*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrsStr))) {
    const key = m[1]!;
    if (m[2] !== undefined) {
      props[key] = m[2]; // double-quoted string
    } else if (m[3] !== undefined) {
      props[key] = m[3]; // single-quoted string
    } else if (m[4] !== undefined) {
      const expr = m[4].trim();
      const num = Number(expr);
      props[key] = isNaN(num) ? expr : num; // number or string expr
    } else {
      props[key] = true; // bare boolean attribute
    }
  }
  return props;
}

/**
 * Try to parse an HTML token as a custom component tag.
 * Only tags starting with an uppercase letter are treated as components.
 *
 * Supports:
 *   `<Foo />`            — self-closing
 *   `<Foo bar="baz" />`  — self-closing with props
 *   `<Foo bar="baz" count={5}>...markdown...</Foo>` — container
 *
 * Inner content is re-parsed as markdown.
 * Nesting the SAME component name is intentionally not supported (use different names).
 */
function parseComponentTag(raw: string): ParsedTag | null {
  const trimmed = raw.trim();

  // Self-closing: <Foo ... />
  let m = trimmed.match(/^<([A-Z]\w*)((?:\s[^>]*)?)\s*\/>$/);
  if (m) {
    return { tagName: m[1]!, props: parseAttrs(m[2]!), innerMarkdown: null };
  }

  // Container: <Foo ...>content</Foo>
  m = trimmed.match(/^<([A-Z]\w*)((?:\s[^>]*)?)>/);
  if (!m) return null;

  const tagName = m[1]!;
  const closeTag = `</${tagName}>`;

  // Find matching close tag by depth counting
  let depth = 1;
  let pos = m[0].length;
  const openRe = new RegExp(`<${tagName}\\b`, "g");
  const closeRe = new RegExp(closeTag, "g");

  while (depth > 0 && pos < trimmed.length) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;

    const nextOpen = openRe.exec(trimmed);
    const nextClose = closeRe.exec(trimmed);

    const openIdx = nextOpen ? nextOpen.index : Infinity;
    const closeIdx = nextClose ? nextClose.index : Infinity;

    if (closeIdx === Infinity) return null; // unmatched

    if (openIdx < closeIdx) {
      depth++;
      pos = openIdx + 1;
    } else {
      depth--;
      if (depth === 0) {
        const inner = trimmed.slice(m[0].length, closeIdx).trim();
        return { tagName, props: parseAttrs(m[2]!), innerMarkdown: inner };
      }
      pos = closeIdx + closeTag.length;
    }
  }

  return null;
}

/** Render a custom component tag, recursing into inner markdown if present. */
function renderCustomComponent(parsed: ParsedTag): JSX.Element {
  const Comp = _components[parsed.tagName];
  if (!Comp) {
    // Unknown component — render as raw inner content (skip the wrapper tags)
    if (parsed.innerMarkdown != null) {
      return renderBlocks(marked.lexer(parsed.innerMarkdown));
    }
    return <></>;
  }

  if (parsed.innerMarkdown == null) {
    // Self-closing
    return <Dynamic component={Comp} {...parsed.props} />;
  }

  // Container — parse inner content as markdown
  const innerTokens = parsed.innerMarkdown.length > 0
    ? marked.lexer(parsed.innerMarkdown)
    : [];
  return (
    <Dynamic component={Comp} {...parsed.props}>
      {renderBlocks(innerTokens)}
    </Dynamic>
  );
}

// ── Inline renderer ───────────────────────────────────────────

/** Render inline tokens (inside paragraphs, headings, table cells, etc.). */
function renderInline(tokens: Token[]): JSX.Element {
  return (
    <>
      <For each={tokens}>
        {(tok) => {
          if (isStrong(tok))
            return <strong>{renderInline(tok.tokens)}</strong>;
          if (isEm(tok)) return <em>{renderInline(tok.tokens)}</em>;
          if (isDel(tok)) return <del>{renderInline(tok.tokens)}</del>;
          if (isCodespan(tok)) return <InlineCode>{tok.text}</InlineCode>;
          if (isLink(tok))
            return (
              <A href={tok.href ?? undefined} title={tok.title ?? undefined}>
                {renderInline(tok.tokens)}
              </A>
            );
          if (isImage(tok))
            return (
              <Img
                src={tok.href ?? ""}
                alt={tok.text}
                title={tok.title ?? undefined}
              />
            );
          if (isBr(tok)) return <br />;
          if (isHtml(tok)) {
            const parsed = parseComponentTag(tok.raw);
            if (parsed) return renderCustomComponent(parsed);
            // Non-component inline HTML — render as raw
            return <span innerHTML={tok.raw} />;
          }
          if (isText(tok)) return <>{tok.text}</>;
          // Fallback: render raw text
          return <>{tok.raw}</>;
        }}
      </For>
    </>
  );
}

// ── Block renderers ───────────────────────────────────────────

function renderHeading(token: Tokens.Heading): JSX.Element {
  const id = token.text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  const children = renderInline(token.tokens);

  switch (token.depth) {
    case 1:
      return <H1 id={id}>{children}</H1>;
    case 2:
      return <H2 id={id}>{children}</H2>;
    case 3:
      return <H3 id={id}>{children}</H3>;
    default:
      return <H4 id={id}>{children}</H4>;
  }
}

/** Render a list item's content — handles both simple text and multi-block items. */
function renderListItemContent(item: Tokens.ListItem): JSX.Element {
  // Simple text item: `tokens` is [Text wrapper with inline tokens]
  if (
    item.tokens.length === 1 &&
    isText(item.tokens[0]) &&
    item.tokens[0].tokens
  ) {
    return renderInline(item.tokens[0].tokens);
  }
  // Multi-block item (paragraphs, nested lists, code blocks)
  return renderBlocks(item.tokens);
}

function renderTable(token: Tokens.Table): JSX.Element {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <For each={token.header}>
            {(cell) => <TableHead>{renderInline(cell.tokens)}</TableHead>}
          </For>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={token.rows}>
          {(row) => (
            <TableRow>
              <For each={row}>
                {(cell) => <TableCell>{renderInline(cell.tokens)}</TableCell>}
              </For>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
}

/** Render a single block-level token. */
function renderBlock(token: Token): JSX.Element {
  if (isHeading(token)) return renderHeading(token);
  if (isParagraph(token)) return <P>{renderInline(token.tokens)}</P>;
  if (isCode(token)) return <Pre lang={token.lang ?? ""}>{token.text}</Pre>;
  if (isBlockquote(token))
    return <Blockquote>{renderBlocks(token.tokens)}</Blockquote>;
  if (isList(token)) {
    return token.ordered ? (
      <ark.ol
        class="my-6 ml-6 list-decimal [&>li]:mt-2"
        start={token.start ? Number(token.start) : undefined}
      >
        <For each={token.items}>
          {(item) => <li>{renderListItemContent(item)}</li>}
        </For>
      </ark.ol>
    ) : (
      <ark.ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <For each={token.items}>
          {(item) => <li>{renderListItemContent(item)}</li>}
        </For>
      </ark.ul>
    );
  }
  if (isTable(token)) return renderTable(token);
  if (isHtml(token)) {
    const parsed = parseComponentTag(token.raw);
    if (parsed) return renderCustomComponent(parsed);
    // Non-component block HTML — render as raw
    return <div innerHTML={token.raw} />;
  }
  if (isHr(token)) return <Hr />;
  if (isSpace(token)) return <></>;
  // Unknown — skip for safety
  return <></>;
}

/** Render an array of block-level tokens. */
function renderBlocks(tokens: Token[]): JSX.Element {
  return (
    <>
      <For each={tokens}>{(tok) => renderBlock(tok)}</For>
    </>
  );
}

// ── Markdown Component ───────────────────────────────────────

interface MarkdownProps {
  /** Markdown string to render. */
  content: string;
  class?: string;
  /**
   * Map of custom components available for embedding in markdown.
   * Keys are tag names (must start with uppercase letter).
   *
   * @example
   * ```tsx
   * <Markdown
   *   content={`<Callout type="warning">Hello **world**</Callout>`}
   *   components={{ Callout }}
   * />
   * ```
   */
  components?: ComponentMap;
}

/**
 * Renders a markdown string using SolidJS components.
 *
 * Parses markdown with `marked.lexer()` and maps every token to
 * typed components (H1-H4, P, A, Img, Pre, Table, etc.) — no `innerHTML`.
 *
 * Supports MDX-style embedded components via the `components` prop:
 * any `<ComponentName ...props>` tag in markdown renders as the matching
 * SolidJS component, with inner content re-parsed as markdown.
 *
 * Code blocks inside `<Pre>` get syntax highlighting via highlight.js.
 */
export const Markdown: Component<MarkdownProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "content", "components"]);

  const tokens = () => {
    const raw = local.content ?? "";
    return raw.length > 0 ? marked.lexer(raw) : [];
  };

  // Wire up custom components before render (safe — Solid renders synchronously)
  _components = local.components ?? {};
  const rendered = renderBlocks(tokens());
  _components = {};

  return (
    <div
      class={`prose dark:prose-invert max-w-none${local.class ? ` ${local.class}` : ""}`}
      {...rest}
    >
      {rendered}
    </div>
  );
};
