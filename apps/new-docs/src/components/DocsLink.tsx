import { type Component } from "solid-js";
import { ArrowRightUp } from "./ArrowRightUp";

interface DocsLinkProps {
  href: string;
}

/**
 * External documentation link component.
 * Renders a link to Ark UI docs with an external link icon.
 */
export const DocsLink: Component<DocsLinkProps> = (props) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowRightUp />
    Docs
  </a>
);
