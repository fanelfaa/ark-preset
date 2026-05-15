import { createFileRoute, Link } from '@tanstack/solid-router'

export const Route = createFileRoute('/docs/')({
  component: DocsOverview,
})

function DocsOverview() {
  return (
    <div class="space-y-12">
      <div>
        <h1 class="text-4xl font-bold tracking-tight">Documentation</h1>
        <p class="mt-3 text-lg text-muted-foreground">
          Component API references, usage guides, and examples.
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-6">UI Components</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/docs/components/button"
            class="group rounded-lg border border-border p-4 hover:border-foreground/30 transition-colors"
          >
            <h3 class="font-medium group-hover:text-foreground">Button</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Displays a button or a component that looks like a button.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
