import { Link, Outlet, createRootRoute } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { Button } from "@ark-preset/solid";
import { ThemeToggle } from "../components/ThemeToggle";

import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      {/* Header */}
      <header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div class="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
          <Button
            size="icon"
            variant="outline"
            class="lg:hidden"
            asChild={(props) => <label for="drawer-trigger" {...props()} />}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-5"
            >
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          </Button>
          <Link to="/" class="text-lg font-bold hover:text-muted-foreground transition-colors">
            UI
          </Link>
          <nav class="flex items-center gap-4 text-sm ml-6">
            <Link to="/" class="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link
              to="/docs/components/$component"
              params={{ component: "button" }}
              class="text-foreground font-medium hover:text-foreground transition-colors"
            >
              Components
            </Link>
          </nav>
          <div class="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
