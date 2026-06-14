import { splitProps, type Component, type JSX } from "solid-js";
import { type HTMLArkProps } from "@ark-ui/solid/factory";
import CodeBlock from "../CodeBlock";
import { Table as TableBase } from "@fan-ui/solid";

// ── Re-export typography components from @fan-ui/solid ──────────────
export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  List,
} from "@fan-ui/solid";

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

// ── Re-export table components from @fan-ui/solid ───────────────────
export {
  TableHeader as THead,
  TableBody as TBody,
  TableHead as Th,
  TableCell as Td,
  TableRow as Tr,
} from "@fan-ui/solid";
