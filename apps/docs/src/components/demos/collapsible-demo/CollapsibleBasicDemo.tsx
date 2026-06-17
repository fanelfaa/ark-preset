import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@fan-ui/solid";

export default function CollapsibleBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Collapsible>
        <CollapsibleTrigger>
          Click to expand
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="pt-4 text-sm text-foreground">
            This is the collapsible content. It can contain any elements you want to show or hide.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
