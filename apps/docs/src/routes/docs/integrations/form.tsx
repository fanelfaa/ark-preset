import { createFileRoute } from "@tanstack/solid-router";
import TanstackFormDoc from "../../../content/docs/tanstack-form/index.tsx";

export const Route = createFileRoute("/docs/integrations/form")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TanstackFormDoc />;
}
