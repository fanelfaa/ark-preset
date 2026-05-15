import { createRootRoute, Outlet, Link } from '@tanstack/solid-router'
import { Component, For } from 'solid-js'

const navGroups = [
  {
    label: 'UI',
    items: [
      { href: '/docs/components/accordion', label: 'Accordion' },
      { href: '/docs/components/button', label: 'Button' },
      { href: '/docs/components/checkbox', label: 'Checkbox' },
      { href: '/docs/components/collapsible', label: 'Collapsible' },
      { href: '/docs/components/date-picker', label: 'Date Picker' },
      { href: '/docs/components/dialog', label: 'Dialog' },
      { href: '/docs/components/drawer', label: 'Drawer' },
      { href: '/docs/components/input', label: 'Input' },
      { href: '/docs/components/menu', label: 'Menu' },
      { href: '/docs/components/number-input', label: 'Number Input' },
      { href: '/docs/components/popover', label: 'Popover' },
      { href: '/docs/components/radio-group', label: 'Radio Group' },
      { href: '/docs/components/select', label: 'Select' },
      { href: '/docs/components/slider', label: 'Slider' },
      { href: '/docs/components/switch', label: 'Switch' },
      { href: '/docs/components/tabs', label: 'Tabs' },
      { href: '/docs/components/toast', label: 'Toast' },
      { href: '/docs/components/tooltip', label: 'Tooltip' },
    ],
  },
]

const DocsLayout: Component = () => {
  return (
    <div class="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
          <Link to="/" class="text-lg font-bold hover:text-muted-foreground transition-colors">
            Solid UI
          </Link>
          <nav class="flex items-center gap-4 text-sm ml-6">
            <Link
              to="/docs"
              class="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ class: 'text-foreground font-medium' }}
            >
              Docs
            </Link>
            <Link
              to="/docs/components/button"
              class="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ class: 'text-foreground font-medium' }}
            >
              Components
            </Link>
          </nav>
        </div>
      </header>

      <div class="mx-auto max-w-7xl flex">
        {/* Sidebar */}
        <aside class="hidden lg:block w-64 shrink-0 border-r border-border">
          <nav class="sticky top-14 p-4 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
            <For each={navGroups}>
              {(group) => (
                <div class="mb-6">
                  <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-3">
                    {group.label}
                  </h4>
                  <ul class="space-y-0.5">
                    <For each={group.items}>
                      {(item) => (
                        <li>
                          <Link
                            to={item.href}
                            class="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            activeProps={{
                              class: 'text-foreground font-medium bg-muted/60',
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </nav>
        </aside>

        {/* Main content */}
        <main class="flex-1 min-w-0">
          <div class="max-w-4xl mx-auto px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: DocsLayout,
})
