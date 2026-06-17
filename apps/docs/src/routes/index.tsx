import { createFileRoute, Link } from "@tanstack/solid-router";
import { buttonVariants } from "@ark-preset/core";
import { H2, P, InlineCode } from "@ark-preset/solid";

export const Route = createFileRoute("/")({ component: Home });

const categories = [
  {
    name: "Form & Input",
    count: 19,
    href: "/docs/components/button",
    description: "Button, Input, Select, Checkbox, Switch, and more",
  },
  {
    name: "Overlay",
    count: 8,
    href: "/docs/components/dialog",
    description: "Dialog, Drawer, Popover, Tooltip, Toast, and more",
  },
  {
    name: "Navigation",
    count: 6,
    href: "/docs/components/accordion",
    description: "Accordion, Breadcrumb, Tabs, Menu, Pagination",
  },
  {
    name: "Data Display",
    count: 6,
    href: "/docs/components/card",
    description: "Card, Table, Avatar, Badge, Carousel, Typography",
  },
  {
    name: "Feedback",
    count: 4,
    href: "/docs/components/alert",
    description: "Alert, Progress, Skeleton, Spinner",
  },
  {
    name: "Layout",
    count: 3,
    href: "/docs/components/scroll-area",
    description: "Scroll Area, Separator, Aspect Ratio",
  },
];

const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

const quickLinks = [
  { href: "/docs/components/button", label: "Button" },
  { href: "/docs/components/input", label: "Input" },
  { href: "/docs/components/dialog", label: "Dialog" },
  { href: "/docs/components/select", label: "Select" },
  { href: "/docs/components/toast", label: "Toast" },
  { href: "/docs/components/tabs", label: "Tabs" },
  { href: "/docs/components/accordion", label: "Accordion" },
  { href: "/docs/components/card", label: "Card" },
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
          <Link
            to="/docs/components/$component"
            params={{ component: "button" }}
            class={buttonVariants({ size: "lg" })}
          >
            Browse Components
          </Link>
          <span class="text-sm text-muted-foreground">
            {totalCount} components across {categories.length} categories
          </span>
        </div>
      </section>

      {/* Quick Start */}
      <section class="mb-16 text-center">
        <H2>Quick Start</H2>
        <P class="mb-6">
          Follow the step-by-step guide to add <InlineCode>@ark-preset/solid</InlineCode> to your project.
        </P>
        <Link
          to="/docs/components/$component"
          params={{ component: "button" }}
          class={buttonVariants({ size: "lg" })}
        >
          Browse Components
        </Link>
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
          <Link
            to="/docs/components/$component"
            params={{ component: "button" }}
            class={buttonVariants({ variant: "outline" })}
          >
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
