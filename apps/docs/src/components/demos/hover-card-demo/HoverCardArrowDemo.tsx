import { HoverCard, HoverCardTrigger, HoverCardBase } from "@ark-preset/solid";

export default function HoverCardArrowDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground mb-2">Custom arrow size</p>
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardBase.Positioner>
            <HoverCardBase.Content>
              <HoverCardBase.Arrow class="[--arrow-size:14px]">
                <HoverCardBase.ArrowTip />
              </HoverCardBase.Arrow>
              <div class="text-sm">Custom arrow size</div>
            </HoverCardBase.Content>
          </HoverCardBase.Positioner>
        </HoverCard>
      </div>
    </div>
  );
}
