import { NumberInput } from "@ark-preset/solid";

export default function NumberInputBasicDemo() {
  return (
    <div>
      <NumberInput defaultValue="50" min={0} max={100} />
    </div>
  );
}
