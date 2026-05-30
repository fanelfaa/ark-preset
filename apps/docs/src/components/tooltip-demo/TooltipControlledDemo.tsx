import { createSignal } from "solid-js";
import { Tooltip, TooltipTrigger, TooltipContent } from "@ui/solid";

export default function TooltipControlledDemo() {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col items-center gap-4">
        <button
          class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open() ? "Close" : "Open"} tooltip
        </button>
        <Tooltip open={open()} onOpenChange={(e) => setOpen(e.open)}>
          <TooltipTrigger>Hover or click above</TooltipTrigger>
          <TooltipContent>Controlled tooltip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
