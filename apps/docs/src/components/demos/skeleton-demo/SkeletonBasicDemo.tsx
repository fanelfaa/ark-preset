import { Skeleton } from "@ark-preset/solid";

export default function SkeletonBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        {/* Avatar + text line */}
        <div class="flex items-center gap-4">
          <Skeleton class="size-10 rounded-full" />
          <div class="flex flex-col gap-2">
            <Skeleton class="h-4 w-[200px]" />
            <Skeleton class="h-3 w-[160px]" />
          </div>
        </div>
        {/* Card skeleton */}
        <div class="flex flex-col gap-3 rounded-lg border border-border p-4">
          <Skeleton class="h-5 w-[250px]" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-[80%]" />
          <div class="flex gap-2 pt-2">
            <Skeleton class="h-8 w-20" />
            <Skeleton class="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
