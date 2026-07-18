import { Link, Outlet, createRootRoute } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { Button, Drawer, DrawerTrigger, DrawerContent, DrawerBase } from "@ark-preset/solid";
import { ThemeToggle } from "../components/ThemeToggle";
import { GradientCloud } from "../components/GradientCloud";
import { SidebarNav } from "../components/DocsLayout";

import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <GradientCloud />
      <div style="position:relative;z-index:1;min-height:100vh">
        {/* Header */}
        <header class="sticky top-0 z-50 border-b border-border bg-background/40 backdrop-blur-2xl">
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

        <Drawer swipeDirection="start">
          <DrawerTrigger id="drawer-trigger" class="hidden" />
          <DrawerContent>
            <DrawerBase.Context>
              {(api) => <SidebarNav onLinkClick={() => api().setOpen(false)} />}
            </DrawerBase.Context>
          </DrawerContent>
        </Drawer>

        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    </>
  );
}
