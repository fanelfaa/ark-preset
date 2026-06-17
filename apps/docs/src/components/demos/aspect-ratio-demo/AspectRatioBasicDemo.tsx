import { AspectRatio } from "@ark-preset/solid";

export default function AspectRatioBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-2">
          <p class="text-sm font-medium">16:9</p>
          <AspectRatio ratio={16 / 9} class="rounded-md bg-muted">
            <div class="flex h-full items-center justify-center text-muted-foreground text-sm">
              16:9
            </div>
          </AspectRatio>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">4:3</p>
          <AspectRatio ratio={4 / 3} class="rounded-md bg-muted">
            <div class="flex h-full items-center justify-center text-muted-foreground text-sm">
              4:3
            </div>
          </AspectRatio>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">1:1</p>
          <AspectRatio ratio={1 / 1} class="rounded-md bg-muted">
            <div class="flex h-full items-center justify-center text-muted-foreground text-sm">
              1:1
            </div>
          </AspectRatio>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">9:16</p>
          <AspectRatio ratio={9 / 16} class="rounded-md bg-muted">
            <div class="flex h-full items-center justify-center text-muted-foreground text-sm">
              9:16
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
