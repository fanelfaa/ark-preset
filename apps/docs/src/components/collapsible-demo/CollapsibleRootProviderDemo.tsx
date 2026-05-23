import { useCollapsible } from "@ark-ui/solid/collapsible";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
} from "@ui/solid";

export default function CollapsibleRootProviderDemo() {
  const collapsible = useCollapsible({ defaultOpen: true });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(collapsible().open)}
      </output>

      <CollapsibleRootProvider value={collapsible}>
        <CollapsibleTrigger>
          Click to expand
          <CollapsibleIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CollapsibleIndicator>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="pt-4 text-sm text-foreground">
            The collapsible state is managed externally via <code>useCollapsible</code>. The{" "}
            <code>output</code> element above reads <code>collapsible().open</code> outside the
            collapsible tree.
          </div>
        </CollapsibleContent>
      </CollapsibleRootProvider>
    </div>
  );
}
