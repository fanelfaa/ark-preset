import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@ark-preset/solid";

export default function CollapsibleIndicatorDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        Toggle Content
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="pt-4 text-sm">The indicator automatically rotates when expanded.</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
