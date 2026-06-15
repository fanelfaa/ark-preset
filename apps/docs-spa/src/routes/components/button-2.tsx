import { createFileRoute } from "@tanstack/solid-router";
import { Markdown } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import { Button } from "@fan-ui/solid";
import type { Component } from "solid-js";

export const Route = createFileRoute("/components/button-2")({
  component: ButtonPage,
});

// ── Live demo components (embedded in markdown via <ComponentName />) ─

const ButtonBasicDemo: Component = () => (
  <div class="rounded-lg border border-border p-6 not-prose">
    <div class="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </div>
);

const ButtonVariantsDemo: Component = () => (
  <div class="flex flex-wrap gap-4 not-prose">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);

const ButtonSizesDemo: Component = () => (
  <div class="flex flex-wrap items-center gap-4 not-prose">
    <Button size="sm">Sm</Button>
    <Button size="md">Md</Button>
    <Button size="lg">Lg</Button>
    <Button size="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </Button>
  </div>
);

const ButtonDisabledDemo: Component = () => (
  <div class="flex flex-wrap gap-4 not-prose">
    <Button disabled>Default</Button>
    <Button variant="secondary" disabled>
      Secondary
    </Button>
    <Button variant="destructive" disabled>
      Destructive
    </Button>
    <Button variant="outline" disabled>
      Outline
    </Button>
    <Button variant="ghost" disabled>
      Ghost
    </Button>
    <Button variant="link" disabled>
      Link
    </Button>
  </div>
);

const ButtonLoadingDemo: Component = () => (
  <div class="flex flex-wrap gap-4 not-prose">
    <Button loading>Default</Button>
    <Button variant="secondary" loading>
      Secondary
    </Button>
    <Button variant="destructive" loading>
      Destructive
    </Button>
    <Button variant="outline" loading>
      Outline
    </Button>
    <Button variant="ghost" loading>
      Ghost
    </Button>
    <Button variant="link" loading>
      Link
    </Button>
  </div>
);

// ── Markdown content ────────────────────────────────────────────

const RECIPE_CODE = `import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-2.5 text-sm',
      md: 'h-9 px-3 py-1.5',
      lg: 'h-10 px-6',
      icon: 'size-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
})`;

const COMPONENT_CODE = `import { splitProps, type Component, Show, children } from 'solid-js'
import { buttonVariants } from '../recipes/button'
import type { VariantProps } from 'tailwind-variants'
import { ark, HTMLArkProps } from '@ark-ui/solid/factory'

type ButtonProps = HTMLArkProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size', 'loading', 'disabled', 'children'])
  const isDisabled = () => local.loading || local.disabled
  const resolvedChildren = children(() => local.children)
  return (
    <ark.button class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })} disabled={isDisabled()} {...others}>
      <Show when={local.loading}>
        <svg class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </Show>
      {resolvedChildren()}
    </ark.button>
  )
}

export { Button, buttonVariants }`;

const CONTENT = [
  "# Button",
  "",
  "Displays a button or a component that looks like a button.",
  "",
  '<DocsLink href="https://ark-ui.com/docs/guides/composition" />',
  "",
  "<ButtonBasicDemo />",
  "",
  "```tsx",
  "",
  'import { Button } from "~/components/button"',
  "",
  "export function ButtonDemo() {",
  "  return (",
  '    <div class="flex flex-wrap gap-4">',
  "      <Button>Primary</Button>",
  "      <Button variant=\"secondary\">Secondary</Button>",
  "      <Button variant=\"destructive\">Destructive</Button>",
  "      <Button variant=\"outline\">Outline</Button>",
  "      <Button variant=\"ghost\">Ghost</Button>",
  "      <Button variant=\"link\">Link</Button>",
  "    </div>",
  "  )",
  "}",
  "```",
  "",
  "## Installation",
  "",
  "### CLI",
  "",
  "Run the following command to add the component to your project:",
  "",
  "```bash",
  "npx @fan-ui/cli@latest add button",
  "```",
  "",
  "### Manual",
  "",
  "Create the recipe file at `src/components/recipes/button.ts`:",
  "",
  "```ts",
  RECIPE_CODE,
  "```",
  "",
  "Create the component file at `src/components/button.tsx`:",
  "",
  "```tsx",
  COMPONENT_CODE,
  "```",
  "",
  "> **Note:** Make sure your project has the Tailwind CSS theme variables set up (`--primary`, `--destructive`, `--ring`, etc.) or override the utility classes to match your design system.",
  "",
  "## Usage",
  "",
  "Import the component:",
  "",
  "```tsx",
  'import { Button } from "~/components/button";',
  "```",
  "",
  "Basic usage:",
  "",
  "```tsx",
  "<Button>Click me</Button>",
  "```",
  "",
  "With event handler:",
  "",
  "```tsx",
  '<Button onClick={() => console.log("clicked!")}>Submit</Button>',
  "```",
  "",
  "Combining variant and size:",
  "",
  "```tsx",
  '<Button variant="destructive" size="lg">',
  "  Delete Account",
  "</Button>",
  "```",
  "",
  "With icon:",
  "",
  "```tsx",
  '<Button variant="outline" size="icon">',
  '  <svg',
  '    xmlns="http://www.w3.org/2000/svg"',
  '    width="16"',
  '    height="16"',
  '    viewBox="0 0 24 24"',
  '    fill="none"',
  '    stroke="currentColor"',
  '    stroke-width="2"',
  '    stroke-linecap="round"',
  '    stroke-linejoin="round"',
  "  >",
  '    <path d="M5 12h14" />',
  '    <path d="M12 5v14" />',
  "  </svg>",
  "</Button>",
  "```",
  "",
  "Custom class override:",
  "",
  "```tsx",
  '<Button class="w-full">Full Width Button</Button>',
  "```",
  "",
  "## Variants",
  "",
  "Use the `variant` prop to change the visual style.",
  "",
  "<ButtonVariantsDemo />",
  "",
  "## Sizes",
  "",
  "Use the `size` prop to change the button size.",
  "",
  "<ButtonSizesDemo />",
  "",
  "## Disabled",
  "",
  "Add the `disabled` prop to disable interaction.",
  "",
  "<ButtonDisabledDemo />",
  "",
  "## Loading",
  "",
  "Add the `loading` prop to show a spinner alongside the button label and automatically disable interaction.",
  "",
  "<ButtonLoadingDemo />",
  "",
  "Useful for async operations like form submissions:",
  "",
  "```tsx",
  'import { createSignal } from "solid-js";',
  'import { Button } from "~/components/button";',
  "",
  "export function SubmitDemo() {",
  "  const [loading, setLoading] = createSignal(false);",
  "",
  "  async function handleSubmit() {",
  "    setLoading(true);",
  "    await new Promise((r) => setTimeout(r, 2000));",
  "    setLoading(false);",
  "  }",
  "",
  "  return (",
  "    <Button loading={loading()} onClick={handleSubmit}>",
  "      Submit",
  "    </Button>",
  "  );",
  "}",
  "```",
  "",
  "## Link",
  "",
  "Use the `buttonVariants` helper to render a link that looks like a button.",
  "",
  "```tsx",
  'import { Button, buttonVariants } from "~/components/button";',
  "",
  '<a class={buttonVariants({ variant: "outline" })} href="/docs">',
  "  Click here",
  "</a>;",
  "",
  "// or",
  "",
  "<Button asChild={(props)=><a {...props()}/>}>",
  "  Click Here",
  "</Button>",
  "```",
  "",
  "## API Reference",
  "",
  "| Prop | Type | Default |",
  "|------|------|---------|",
  "| variant | `\"default\" \\| \"secondary\" \\| \"destructive\" \\| \"outline\" \\| \"ghost\" \\| \"link\"` | `\"default\"` |",
  "| size | `\"sm\" \\| \"md\" \\| \"lg\" \\| \"icon\"` | `\"sm\"` |",
  "| loading | `boolean` | `false` |",
  "| disabled | `boolean` | `false` |",
  "| class | `string` | — |",
].join("\n");

// ── Page component ──────────────────────────────────────────────

function ButtonPage() {
  return (
    <Markdown
      content={CONTENT}
      components={{
        DocsLink,
        ButtonBasicDemo,
        ButtonVariantsDemo,
        ButtonSizesDemo,
        ButtonDisabledDemo,
        ButtonLoadingDemo,
      }}
    />
  );
}
