import {
  Collapsible,
  CollapsibleIndicator,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@ark-preset/solid";

export default function CollapsibleBasicDemo() {
  return (
    <div>
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
