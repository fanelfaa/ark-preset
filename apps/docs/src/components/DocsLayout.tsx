import { type JSX, type Component, Index } from "solid-js";
import { Link } from "@tanstack/solid-router";
import { ScrollArea, DrawerContent, Drawer, DrawerTrigger, DrawerBase } from "@ark-preset/solid";
import { sidebarNav } from "../sidebar-nav";

interface DocsLayoutProps {
  children?: JSX.Element;
}

export const DocsLayout: Component<DocsLayoutProps> = (props) => {
  return (
    <div class="mx-auto max-w-7xl flex">
      {/* Sidebar */}
      <aside class="hidden lg:block w-64 shrink-0 border-r border-border bg-background sticky top-14 self-start h-[calc(100vh-3.5rem)]">
        <SidebarNav />
      </aside>

      {/* Mobile drawer */}
      <Drawer swipeDirection="start">
        <DrawerTrigger id="drawer-trigger" class="hidden" />
        <DrawerContent>
          <DrawerBase.Context>
            {(api) => <SidebarNav onLinkClick={() => api().setOpen(false)} />}
          </DrawerBase.Context>
        </DrawerContent>
      </Drawer>

      {/* Main content */}
      <main class="flex-1 min-w-0 bg-background">
        <div class="max-w-4xl mx-auto px-6 py-10 prose dark:prose-invert">{props.children}</div>
      </main>
    </div>
  );
};

function SidebarNav(props: { onLinkClick?: () => void }) {
  return (
    <ScrollArea class="h-full">
      <nav class="p-4">
        <Index each={sidebarNav}>
          {(category) => (
            <div class="mb-6">
              <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-3">
                {category().category}
              </h4>
              <ul class="space-y-0.5">
                <Index each={category().links}>
                  {(link) => (
                    <li>
                      <Link
                        to={link().href}
                        activeProps={{ class: "!text-foreground font-medium bg-muted/80" }}
                        class="block rounded-md px-3 py-1.5 text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                        onClick={props.onLinkClick}
                      >
                        {link().label}
                      </Link>
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
