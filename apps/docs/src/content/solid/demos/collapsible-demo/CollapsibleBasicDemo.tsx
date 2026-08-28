import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@ark-preset/solid";

export default function CollapsibleBasicDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
      <CollapsibleContent>
        <div class="pt-4 text-sm">Hidden content goes here.</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
