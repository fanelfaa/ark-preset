import { createFileRoute, Outlet } from "@tanstack/solid-router";
import { DocsLayout } from "../components";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DocsLayout>
      <Outlet />
    </DocsLayout>
  );
}
