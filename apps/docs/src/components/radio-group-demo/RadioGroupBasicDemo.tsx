import { Index } from "solid-js";
import { RadioGroup, RadioGroupItem } from "@fan-ui/solid";

const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit" },
];

export default function RadioGroupBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <RadioGroup defaultValue="1" orientation="horizontal">
        <Index each={paymentMethods}>
          {(method) => <RadioGroupItem value={method().value}>{method().label}</RadioGroupItem>}
        </Index>
      </RadioGroup>
    </div>
  );
}
