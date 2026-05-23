import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleIndicator,
} from "@ui/solid";

export default function CollapsibleBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Collapsible defaultValue="content">
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
            This is the collapsible content. It can contain any elements you want to show or hide.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
