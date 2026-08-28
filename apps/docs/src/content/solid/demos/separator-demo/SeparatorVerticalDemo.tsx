import { Separator } from "@ark-preset/solid";

export default function SeparatorVerticalDemo() {
  return (
    <div class="flex h-10 items-center gap-4">
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  );
}
