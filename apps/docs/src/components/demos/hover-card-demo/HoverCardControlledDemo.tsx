import { createSignal } from "solid-js";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@fan-ui/solid";

export default function HoverCardControlledDemo() {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground">Open: {open() ? "true" : "false"}</p>
        <HoverCard open={open()} onOpenChange={(e) => setOpen(e.open)}>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>
            <div class="text-sm">Controlled hover card</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
