import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { DocsLayout } from "../components";

export const Route = createFileRoute("/components")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DocsLayout>
      <Outlet />
    </DocsLayout>
  );
}
