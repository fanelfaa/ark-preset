import { type JSX, type Component, Index, onMount } from "solid-js";
import {
  ScrollArea,
  Button,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerBase,
} from "@ark-preset/solid";
import { sidebarNav } from "../sidebar-nav";
import { GitHubIcon } from "./GitHubIcon";
import { ThemeToggle } from "./ThemeToggle";

interface DocsLayoutProps {
  children?: JSX.Element;
  currentFramework?: string;
  isHome?: boolean;
  currentPath?: string;
}

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  const framework = () => props.currentFramework || "solid";

  return (
    <>
      <div class="mx-auto max-w-7xl flex flex-col min-h-screen relative z-1">
        <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div class="flex h-14 items-center justify-between px-6">
            <div class="flex items-center gap-4">
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
              <a class="font-bold hover:text-primary transition-colors" href="/">
                Ark Preset Docs
              </a>
            </div>
            <div class="flex items-center gap-4">
              <ThemeToggle />
              <select
                id="framework-selector"
                class="bg-transparent border border-border rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary"
                data-testid="framework-selector"
              >
                <option value="solid" selected={framework() === "solid"}>
                  Solid
                </option>
                <option value="react" selected={framework() === "react"}>
                  React
                </option>
                <option value="vue" selected={framework() === "vue"}>
                  Vue
                </option>
              </select>
            </div>
          </div>
        </header>

        <Drawer swipeDirection="start" lazyMount unmountOnExit>
          <DrawerTrigger id="drawer-trigger" class="hidden" />
          <DrawerContent>
            <DrawerBase.Context>
              {(api) => (
                <SidebarNav
                  currentPath={props.currentPath}
                  currentFramework={framework()}
                  onLinkClick={() => api().setOpen(false)}
                />
              )}
            </DrawerBase.Context>
          </DrawerContent>
        </Drawer>

        <div class="flex flex-1">
          {/* Sidebar */}
          {!props.isHome && (
            <aside class="hidden lg:block w-64 shrink-0 border-r border-border bg-background/60 backdrop-blur-3xl sticky top-14 self-start h-[calc(100vh-3.5rem)]">
              <SidebarNav currentPath={props.currentPath} currentFramework={framework()} />
            </aside>
          )}

          {/* Main content */}
          <main class="flex-1 min-w-0 bg-background/60 backdrop-blur-3xl flex flex-col">
            {props.isHome ? (
              props.children
            ) : (
              <div class="max-w-4xl mx-auto px-6 py-10 prose dark:prose-invert space-y-6 flex-1 w-full">
                {props.children}
              </div>
            )}
            {/* Footer */}
            <footer class="border-t border-border bg-background/30 backdrop-blur-3xl mt-auto">
              <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
                <a
                  href="https://github.com/fanelfaa/ark-preset"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <span>&copy; {new Date().getFullYear()} Ark Preset</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export function SidebarNav(props: {
  onLinkClick?: () => void;
  currentFramework: string;
  currentPath?: string;
}) {
  const getHref = (originalHref: string) => {
    // If it's a docs link, map it to the current framework
    if (originalHref.startsWith("/docs/components/")) {
      return `/${props.currentFramework}/components/${originalHref.split("/").pop()}`;
    }
    return originalHref;
  };

  const isActive = (href: string) => {
    if (!props.currentPath) return false;
    const path = props.currentPath.replace(/\/$/, "");
    const linkHref = getHref(href).replace(/\/$/, "");
    return path === linkHref;
  };

  onMount(() => {
    // Wait a bit for layout to settle (Astro Island hydration)
    setTimeout(() => {
      // Find all active links (could be desktop sidebar or drawer sidebar)
      const activeLinks = document.querySelectorAll('a[data-active-nav="true"]');

      activeLinks.forEach((activeEl) => {
        // Skip if not visible
        if (activeEl.getBoundingClientRect().width === 0) return;

        // Find the scrollable container
        let container = activeEl.parentElement;
        while (container && container !== document.body) {
          const style = window.getComputedStyle(container);
          // Ark UI ScrollArea viewport has overflow: scroll
          if (
            style.overflowY === "auto" ||
            style.overflowY === "scroll" ||
            container.hasAttribute("data-part")
          ) {
            if (
              container.getAttribute("data-part") === "viewport" ||
              style.overflowY !== "visible"
            ) {
              break;
            }
          }
          container = container.parentElement;
        }

        if (container && container !== document.body) {
          const containerRect = container.getBoundingClientRect();
          const activeRect = activeEl.getBoundingClientRect();

          const scrollTop =
            container.scrollTop +
            (activeRect.top - containerRect.top) -
            containerRect.height / 2 +
            activeRect.height / 2;

          container.scrollTo({ top: scrollTop, behavior: "smooth" });
        } else {
          // Fallback
          activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      });
    }, 200);
  });

  return (
    <ScrollArea class="h-full">
      <nav class="p-4">
        <Index each={sidebarNav}>
          {(category) => (
            <div class="mb-6">
              <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-3">
                {category().category}
              </h4>
              <ul class="space-y-1">
                <Index each={category().links}>
                  {(link) => (
                    <li>
                      <a
                        data-active-nav={isActive(link().href) ? "true" : undefined}
                        href={getHref(link().href)}
                        class={`block rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground hover:outline-2 outline-neutral-200 ${
                          isActive(link().href)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground"
                        }`}
                        onClick={props.onLinkClick}
                      >
                        {link().label}
                      </a>
                    </li>
                  )}
                </Index>
              </ul>
            </div>
          )}
        </Index>
      </nav>
    </ScrollArea>
  );
}
