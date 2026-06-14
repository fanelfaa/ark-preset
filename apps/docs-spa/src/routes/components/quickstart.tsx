import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, P, InlineCode, Pre, Blockquote } from "../../components/markdown";

export const Route = createFileRoute("/components/quickstart")({ component: QuickstartPage });

const themeCssContent = `@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-popover: hsl(var(--background));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
}

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  /* Radius */
  --radius: 0.625rem;
  --radius-xs: 0.125rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

[data-scope="toast"][data-part="root"] {
  translate: var(--x) var(--y);
  scale: var(--scale);
  z-index: var(--z-index);
  height: var(--height);
  opacity: var(--opacity);
  will-change: translate, opacity, scale;
  transition:
    translate 400ms,
    scale 400ms,
    opacity 400ms,
    height 400ms;
}`;

function QuickstartPage() {
  return (
    <>
      <H1>Quickstart</H1>

      <P>
        Get started using <InlineCode>@fan-ui</InlineCode> components in your own project. This is a
        copy-paste component library — pick any component from the sidebar, copy the code, and paste
        it into your project.
      </P>

      <Blockquote>
        <strong>Framework support:</strong> Currently only Solid.js is supported. Support for React,
        Vue, and other frameworks is coming in future releases. A CLI (
        <InlineCode>@fan-ui/cli</InlineCode>) to automate setup is also planned.
      </Blockquote>

      <H2>Prerequisites</H2>

      <P>
        Install Tailwind CSS, <InlineCode>tailwind-variants</InlineCode> (required by all component
        recipes), and the Vite plugin if using Vite:
      </P>

      <Pre lang="bash">{`
npm install tailwindcss tailwind-variants @tailwindcss/vite
      `}</Pre>

      <P>
        Install <InlineCode>@ark-ui/solid</InlineCode> (used by all components) and its peer
        dependency <InlineCode>solid-js</InlineCode>:
      </P>

      <Pre lang="bash">{`
npm install @ark-ui/solid solid-js
      `}</Pre>

      <P>Optionally install the animation plugin (used by toast, dialog, and other components):</P>

      <Pre lang="bash">{`
npm install tw-animate-css
      `}</Pre>

      <P>
        Configure <InlineCode>src/index.css</InlineCode>:
      </P>

      <Pre lang="css">{`@import "tailwindcss";
@import "tw-animate-css";`}</Pre>

      <H2>Theme variables</H2>

      <P>
        Add these CSS custom properties to your main CSS file. They define the design tokens used by
        all components.
      </P>

      <Pre lang="css">{themeCssContent}</Pre>

      <Blockquote>
        <strong>Note:</strong> The <InlineCode>[data-scope="toast"]</InlineCode> block at the bottom
        is specific to the Toast component — you can omit it if you're not using Toast.
      </Blockquote>

      <H2>Using a component</H2>

      <P>
        Browse the{" "}
        <a
          href="/components/button"
          class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          component library
        </a>
        , find the component you need, and copy the code. Each component page includes the recipe
        (styling) and the component source — paste both into your project and customize as needed.
      </P>

      <P>
        For example, to use the Button component, create{" "}
        <InlineCode>src/components/recipes/button.ts</InlineCode> with the recipe and{" "}
        <InlineCode>src/components/button.tsx</InlineCode> with the component code from the{" "}
        <a
          href="/components/button"
          class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Button page
        </a>
        .
      </P>

      <Blockquote>
        <strong>Tip:</strong> A CLI (<InlineCode>@fan-ui/cli</InlineCode>) to automate this setup
        will be available in a future release.
      </Blockquote>

      <H2>Next steps</H2>

      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          Browse the{" "}
          <a
            href="/components/button"
            class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            component library
          </a>{" "}
          to find components
        </li>
        <li>
          Check the{" "}
          <a
            href="https://ark-ui.com/docs/guides/composition"
            class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Ark UI documentation
          </a>{" "}
          for composability patterns
        </li>
      </ul>
    </>
  );
}
