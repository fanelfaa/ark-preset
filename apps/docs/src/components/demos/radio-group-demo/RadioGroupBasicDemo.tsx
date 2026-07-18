import { Index } from "solid-js";
import { DemoWrapper } from "../../DemoWrapper";
import { RadioGroup, RadioGroupItem } from "@ark-preset/solid";
const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit" },
];
export default function RadioGroupBasicDemo() {
  return (
    <DemoWrapper>
      <RadioGroup defaultValue="1" orientation="horizontal">
        <Index each={paymentMethods}>
          {(method) => <RadioGroupItem value={method().value}>{method().label}</RadioGroupItem>}
        </Index>
      </RadioGroup>
    </DemoWrapper>
  );
}
