import { DemoWrapper } from "../../DemoWrapper";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ark-preset/solid";

export default function HoverCardPositioningDemo() {
  return (
    <DemoWrapper>
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground mb-2">Positioned to the right</p>
        <HoverCard positioning={{ placement: "right" }}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <div class="text-sm">Positioned to the right</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </DemoWrapper>
  );
}
