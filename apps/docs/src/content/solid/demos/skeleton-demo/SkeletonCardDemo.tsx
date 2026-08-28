import { Skeleton } from "@ark-preset/solid";

export default function SkeletonCardDemo() {
  return (
    <div class="flex flex-col gap-3 rounded-lg border border-border p-4">
      <Skeleton class="h-5 w-[250px]" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-[80%]" />
      <div class="flex gap-2 pt-2">
        <Skeleton class="h-8 w-20" />
        <Skeleton class="h-8 w-20" />
      </div>
    </div>
  );
}
