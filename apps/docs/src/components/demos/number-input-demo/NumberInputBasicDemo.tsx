import { NumberInput } from "@ark-preset/solid";

export default function NumberInputBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <NumberInput defaultValue="50" min={0} max={100} />
    </div>
  );
}
