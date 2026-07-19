import { DemoWrapper } from "../../DemoWrapper";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ark-preset/solid";

export default function HoverCardDelayDemo() {
  return (
    <DemoWrapper>
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground mb-2">Custom delay (200ms open, 100ms close)</p>
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <div class="text-sm">Custom delay hover card</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </DemoWrapper>
  );
}
