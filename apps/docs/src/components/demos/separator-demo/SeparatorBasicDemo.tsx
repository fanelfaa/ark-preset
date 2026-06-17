import { Separator } from "@ark-preset/solid";

export default function SeparatorBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground">Horizontal separator between content</p>
        <div class="space-y-2 mt-2">
          <p class="text-sm">Content above the separator</p>
          <Separator />
          <p class="text-sm">Content below the separator</p>
        </div>
      </div>
      <div>
        <p class="text-sm text-muted-foreground">Vertical separator in a flex row</p>
        <div class="flex h-10 items-center gap-4 mt-2">
          <span class="text-sm">Left</span>
          <Separator orientation="vertical" />
          <span class="text-sm">Center</span>
          <Separator orientation="vertical" />
          <span class="text-sm">Right</span>
        </div>
      </div>
    </div>
  );
}
