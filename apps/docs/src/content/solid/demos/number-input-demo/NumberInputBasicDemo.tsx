import { NumberInput } from "@ark-preset/solid";

export default function NumberInputBasicDemo() {
  return <NumberInput label="Quantity" defaultValue="1" min={1} max={10} />;
}
