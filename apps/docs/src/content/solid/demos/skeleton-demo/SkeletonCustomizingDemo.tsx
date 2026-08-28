import { Skeleton } from "@ark-preset/solid";

export default function SkeletonCustomizingDemo() {
  return (
    <div class="flex flex-col gap-4">
      {/* Circle for avatars */}
      <Skeleton class="size-10 rounded-full" />

      {/* Text line */}
      <Skeleton class="h-4 w-[250px]" />

      {/* Button placeholder */}
      <Skeleton class="h-9 w-24 rounded-md" />

      {/* Full-width card */}
      <Skeleton class="h-32 w-full rounded-xl" />
    </div>
  );
}
