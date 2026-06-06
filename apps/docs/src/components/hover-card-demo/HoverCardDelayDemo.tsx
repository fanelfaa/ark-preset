import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ui/solid";

export default function HoverCardDelayDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground mb-2">Custom delay (200ms open, 100ms close)</p>
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <div class="text-sm">Custom delay hover card</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
