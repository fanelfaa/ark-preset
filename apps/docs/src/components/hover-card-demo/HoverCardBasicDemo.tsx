import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ui/solid";

export default function HoverCardBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent useArrow>
            <div class="text-sm">
              The content of this hover card is displayed when you hover over the trigger element.
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
