import { HoverCard, HoverCardTrigger, HoverCardContent } from "@ark-preset/solid";

export default function HoverCardBasicDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent useArrow>
        <div>Content displayed on hover</div>
      </HoverCardContent>
    </HoverCard>
  );
}
