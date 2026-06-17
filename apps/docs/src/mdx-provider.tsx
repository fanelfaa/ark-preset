import CodeBlock from "./components/CodeBlock";
import { ark } from "@ark-ui/solid/factory";
import { H1, H2, H3, H4, InlineCode, Blockquote, P } from "@fan-ui/solid";
import { Dynamic } from "solid-js/web";
import { children, splitProps, type Component } from "solid-js";

/**
 * solid-marked builtins provider.
 * Compiled `.md` files import `useMDX` from this module via the Vite plugin config.
 */
export function useMDX() {
  return {
    builtins: {
      Root: (props: any) => <div class="prose dark:prose-invert max-w-none" {...props} />,

      Heading: (props: any) => {
        const id =
          typeof props.children === "string"
            ? props.children.toLowerCase().replace(/\s+/g, "-")
            : undefined;
        switch (props.depth) {
          case 1:
            return <H1 id={id}>{props.children}</H1>;
          case 2:
            return <H2 id={id}>{props.children}</H2>;
          case 3:
            return <H3 id={id}>{props.children}</H3>;
          default:
            return <H4 id={id}>{props.children}</H4>;
        }
      },

      Paragraph: (props: any) => {
        const [local, rest] = splitProps(props, ["children"]);
        const resolvedChildren = children(() => local.children);
        if (
          typeof resolvedChildren() === "string" ||
          (Array.isArray(resolvedChildren()) &&
            resolvedChildren.toArray().some((el) => typeof el === "string"))
        ) {
          return <P {...rest}>{resolvedChildren()}</P>;
        }
        return <>{resolvedChildren()}</>;
      },

      Strong: (props: any) => <strong {...props} />,

      Emphasis: (props: any) => <em {...props} />,

      InlineCode: (props: any) => <InlineCode {...props} />,

      Code: (props: any) => <CodeBlock lang={props.lang ?? ""}>{props.children}</CodeBlock>,

      Blockquote: (props: any) => <Blockquote {...props} />,

      Link: (props: any) => {
        const url = props.url ?? props.href ?? "";
        return (
          <a
            href={url}
            class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {props.children}
          </a>
        );
      },

      List: (props: any) =>
        props.ordered ? (
          <ark.ol class="my-6 ml-6 list-decimal [&>li]:mt-2">{props.children}</ark.ol>
        ) : (
          <ark.ul class="my-6 ml-6 list-disc [&>li]:mt-2">{props.children}</ark.ul>
        ),

      ListItem: (props: any) => <li>{props.children}</li>,
      ThematicBreak: () => <hr class="my-6 border-border" />,

      Image: (props: any) => (
        <img
          src={props.url ?? props.src}
          alt={props.alt ?? ""}
          class="rounded-lg border border-border"
        />
      ),

      Table: (props: any) => (
        <div class="my-6 w-full overflow-y-auto">
          <table class="w-full caption-bottom text-sm">{props.children}</table>
        </div>
      ),

      TableHeader: (props: any) => <thead {...props} />,
      TableBody: (props: any) => <tbody {...props} />,
      TableRow: (props: any) => <tr class="border-b border-border" {...props} />,

      TableCell: (props: any) =>
        props.header ? (
          <th class="h-10 px-2 text-left align-middle font-medium">{props.children}</th>
        ) : (
          <td class="p-2 align-middle">{props.children}</td>
        ),

      Break: () => <br />,
      Definition: () => null,
      LinkReference: (props: any) => <a href={props.url}>{props.children}</a>,
      ImageReference: () => null,
      FootnoteDefinition: () => null,
      FootnoteReference: () => null,
    } satisfies Record<string, Component<any>>,

    // MDX JSX elements in the compiled code look up _ctx$.components.X.
    // - Lowercase tags (div, span, p, etc.) are auto-passed through as native HTML elements.
    // - Uppercase tags (Switch, Callout, etc.) must be added to the map explicitly.
    components: new Proxy(
      {
        // User components imported directly in .md files don't need registration here
      } as Record<string, Component<any>>,
      {
        get(target: Record<string, Component<any>>, tag: string) {
          if (tag in target) return target[tag];
          // Auto-passthrough for lowercase HTML elements
          if (tag[0] === tag[0].toLowerCase()) {
            return (props: any) => <Dynamic component={tag} {...props} />;
          }
          // Uppercase tags (e.g. <Switch>, <Callout>) must be registered
          // in the components map or imported directly in the .md file.
          console.warn(
            `[mdx-provider] Unregistered component "${tag}" — ` +
              `import and register it in the components map, or import it directly in the MDX file.`,
          );
          return undefined;
        },
      },
    ) as Record<string, Component<any>>,
  };
}
