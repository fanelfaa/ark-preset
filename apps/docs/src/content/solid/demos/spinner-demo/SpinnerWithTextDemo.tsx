import { Spinner } from "@ark-preset/solid";

export default function SpinnerWithTextDemo() {
  return (
    <div class="flex items-center gap-2">
      <Spinner size="sm" />
      <span class="text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}
