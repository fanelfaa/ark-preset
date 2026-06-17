import { Spinner } from "@ark-preset/solid";

export default function SpinnerBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-3">Spinner sizes</p>
        <div class="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-3">Spinner with text</p>
        <div class="flex items-center gap-2">
          <Spinner size="sm" />
          <span class="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    </div>
  );
}
