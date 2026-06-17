import { useCollapsible } from "@ark-ui/solid/collapsible";
import {
  CollapsibleBase,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@fan-ui/solid";

export default function CollapsibleRootProviderDemo() {
  const collapsible = useCollapsible({ defaultOpen: true });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(collapsible().open)}
      </output>

      <CollapsibleBase.RootProvider value={collapsible}>
        <CollapsibleTrigger>
          Click to expand
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="pt-4 text-sm text-foreground">
            The collapsible state is managed externally via <code>useCollapsible</code>. The{" "}
            <code>output</code> element above reads <code>collapsible().open</code> outside the
            collapsible tree.
          </div>
        </CollapsibleContent>
      </CollapsibleBase.RootProvider>
    </div>
  );
}
