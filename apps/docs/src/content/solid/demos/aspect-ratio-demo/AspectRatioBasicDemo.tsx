import { AspectRatio } from "@ark-preset/solid";

export default function AspectRatioBasicDemo() {
  return (
    <div class="w-full max-w-sm overflow-hidden rounded-md">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=60"
          alt="Image"
          class="size-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}
