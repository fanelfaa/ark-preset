import { NumberInput } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function NumberInputBasicDemo() {
  return (
    <DemoWrapper>
      <NumberInput defaultValue="50" min={0} max={100} />
    </DemoWrapper>
  );
}
