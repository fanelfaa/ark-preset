import { createFileRoute, Link } from "@tanstack/solid-router";
import { buttonVariants } from "@ui/core";
import { H2, P, InlineCode } from "../components/markdown";

export const Route = createFileRoute("/")({ component: Home });

const categories = [
  {
    name: "Form & Input",
    count: 19,
    href: "/components/button",
    description: "Button, Input, Select, Checkbox, Switch, and more",
  },
  {
    name: "Overlay",
    count: 8,
    href: "/components/dialog",
    description: "Dialog, Drawer, Popover, Tooltip, Toast, and more",
  },
  {
    name: "Navigation",
    count: 6,
    href: "/components/accordion",
    description: "Accordion, Breadcrumb, Tabs, Menu, Pagination",
  },
  {
    name: "Data Display",
    count: 6,
    href: "/components/card",
    description: "Card, Table, Avatar, Badge, Carousel, Typography",
  },
  {
    name: "Feedback",
    count: 4,
    href: "/components/alert",
    description: "Alert, Progress, Skeleton, Spinner",
  },
  {
    name: "Layout",
    count: 3,
    href: "/components/scroll-area",
    description: "Scroll Area, Separator, Aspect Ratio",
  },
];

const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

const quickLinks = [
  { href: "/components/button", label: "Button" },
  { href: "/components/input", label: "Input" },
  { href: "/components/dialog", label: "Dialog" },
  { href: "/components/select", label: "Select" },
  { href: "/components/toast", label: "Toast" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/accordion", label: "Accordion" },
  { href: "/components/card", label: "Card" },
];

function Home() {
  return (
    <div class="mx-auto max-w-4xl px-6 py-12">
      {/* Hero */}
      <section class="mb-16 text-center">
        <h1 class="mb-4 text-5xl font-bold tracking-tight">UI Component Library</h1>
        <P>
          A comprehensive collection of accessible, composable UI primitives built with{" "}
          <InlineCode>Ark UI</InlineCode> and <InlineCode>Solid.js</InlineCode>. Ready to use, fully
          typed, and styled with Tailwind CSS.
        </P>
        <div class="mt-8 flex items-center justify-center gap-4">
          <Link to="/components/button" class={buttonVariants({ size: "lg" })}>
            Browse Components
          </Link>
          <span class="text-sm text-muted-foreground">{totalCount} components across {categories.length} categories</span>
        </div>
      </section>

      {/* Quick Start */}
      <section class="mb-16">
        <H2>Quick Start</H2>
        <div class="rounded-lg border border-border bg-muted/30 p-6">
          <pre class="text-sm">
            <code>{`npm install @ui/solid`}</code>
          </pre>
          <p class="mt-4 text-sm text-muted-foreground">Then import and use any component:</p>
          <pre class="mt-2 text-sm">
            <code>{`import { Button } from "@ui/solid";

function MyApp() {
  return <Button variant="primary">Click me</Button>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Component Categories */}
      <section class="mb-16">
        <H2>Components</H2>
        <div class="grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              to={cat.href}
              class="group rounded-lg border border-border p-5 transition-colors hover:border-primary hover:bg-muted/30"
            >
              <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">{cat.description}</p>
              <p class="mt-2 text-xs text-muted-foreground">{cat.count} components</p>
            </Link>
          ))}
        </div>
        <div class="mt-6 text-center">
          <Link to="/components/button" class={buttonVariants({ variant: "outline" })}>
            View All Components
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <H2>Popular Components</H2>
        <div class="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              to={link.href}
              class="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
