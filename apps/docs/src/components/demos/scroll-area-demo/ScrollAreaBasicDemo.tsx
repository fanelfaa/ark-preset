import { ScrollArea } from "@ark-preset/solid";

export default function ScrollAreaBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Vertical scroll</p>
        <ScrollArea class="h-[200px] w-full max-w-[400px]" orientation="vertical">
          <div class="space-y-4 p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p class="text-sm text-foreground">
                Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-2">Horizontal scroll</p>
        <ScrollArea class="w-full max-w-[400px]" orientation="horizontal">
          <div class="flex gap-4 p-4 w-[800px]">
            {Array.from({ length: 12 }, (_, i) => (
              <div class="flex-shrink-0 w-[120px] h-20 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                Card {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
