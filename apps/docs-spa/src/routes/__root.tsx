import { Outlet, createRootRoute } from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/* Header */}
      <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div class="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
          <a href="/" class="text-lg font-bold hover:text-muted-foreground transition-colors">
            Solid UI
          </a>
          <nav class="flex items-center gap-4 text-sm ml-6">
            <a href="/" class="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="/components/button" class="text-foreground font-medium hover:text-foreground transition-colors">
              Components
            </a>
          </nav>
        </div>
      </header>

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
