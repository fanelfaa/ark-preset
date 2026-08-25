declare module "*.md" {
  import type { JSX } from "solid-js";
  const Component: (props: Record<string, unknown>) => JSX.Element;
  export default Component;
  export const frontmatter: unknown;
  export function TableOfContents(props: Record<string, unknown>): JSX.Element;
}

declare module "*.mdx" {
  import type { JSX } from "solid-js";
  const Component: (props: Record<string, unknown>) => JSX.Element;
  export default Component;
  export const frontmatter: unknown;
  export function TableOfContents(props: Record<string, unknown>): JSX.Element;
}
