import { createFileRoute } from "@tanstack/solid-router";
import { docs } from "../../../content/docs";
import { DocsLayout } from "../../../components/DocsLayout";

export const Route = createFileRoute("/docs/components/$component")({
  component: DocPage,
  notFoundComponent: () => (
    <DocsLayout>
      <p class="text-destructive">Component not found</p>
    </DocsLayout>
  ),
});

function DocPage() {
  const params = Route.useParams();
  const component = () => params().component;
  const Doc = docs[component()];

  if (!Doc) {
    return (
      <DocsLayout>
        <p class="text-destructive">Component "{component()}" not found.</p>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout>
      <Doc />
    </DocsLayout>
  );
}
