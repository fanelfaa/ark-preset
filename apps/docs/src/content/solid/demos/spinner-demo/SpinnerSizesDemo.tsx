import { Spinner } from "@ark-preset/solid";

export default function SpinnerSizesDemo() {
  return (
    <div class="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}
