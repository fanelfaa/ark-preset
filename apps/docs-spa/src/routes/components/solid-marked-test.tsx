import { createFileRoute } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import DemoContent from "./solid-marked-demo.mdx";

export const Route = createFileRoute("/components/solid-marked-test")({
  component: SolidMarkedTest,
});

function SolidMarkedTest() {
  const DemoComponent = DemoContent as unknown as Component;

  return (
    <div class="max-w-4xl mx-auto px-6 py-10">
      <div class="rounded-lg border border-border bg-card p-4 mb-8 not-prose">
        <p class="text-sm text-muted-foreground">
          This page imports a <code>.md</code> file as a SolidJS component via
          {" "}<code>vite-plugin-solid-marked</code>. The compiled component uses
          {" "}<code>useMDX()</code> from <code>./src/mdx-provider</code> which
          returns typed builtins mapped to @fan-ui/solid components.
        </p>
      </div>

      <DemoComponent />
    </div>
  );
}
