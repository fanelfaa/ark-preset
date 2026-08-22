import { Toggle } from "@ark-preset/solid";

export default function ToggleSizesDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Toggle size="sm">Sm</Toggle>
      <Toggle size="md">Md</Toggle>
      <Toggle size="lg">Lg</Toggle>
    </div>
  );
}
