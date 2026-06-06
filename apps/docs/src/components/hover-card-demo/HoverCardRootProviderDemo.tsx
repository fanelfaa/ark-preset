import { useHoverCard } from "@ark-ui/solid/hover-card";
import { HoverCardBase } from "@ui/solid";

export default function HoverCardRootProviderDemo() {
  const machine = useHoverCard({ openDelay: 200, closeDelay: 100 });
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col items-center gap-4">
        <p class="text-sm text-muted-foreground mb-2">RootProvider pattern</p>
        <HoverCardBase.RootProvider value={machine}>
          <HoverCardBase.Trigger>Hover me</HoverCardBase.Trigger>
          <HoverCardBase.Positioner>
            <HoverCardBase.Content>
              <div class="text-sm">Content controlled via machine</div>
            </HoverCardBase.Content>
          </HoverCardBase.Positioner>
        </HoverCardBase.RootProvider>
      </div>
    </div>
  );
}
