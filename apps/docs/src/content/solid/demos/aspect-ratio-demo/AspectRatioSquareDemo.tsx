import { AspectRatio } from "@ark-preset/solid";

export default function AspectRatioSquareDemo() {
  return (
    <div class="w-full max-w-sm">
      <AspectRatio ratio={1 / 1}>
        <div class="flex size-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          Square Content
        </div>
      </AspectRatio>
    </div>
  );
}
