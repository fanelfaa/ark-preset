import { Skeleton } from "@ark-preset/solid";

export default function SkeletonAvatarDemo() {
  return (
    <div class="flex items-center gap-4">
      <Skeleton class="size-10 rounded-full" />
      <div class="flex flex-col gap-2">
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-3 w-[160px]" />
      </div>
    </div>
  );
}
