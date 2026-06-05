import { Index } from "solid-js";
import { RadioGroup, RadioGroupItem } from "@ui/solid";

const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit", disabled: true },
];

export default function RadioGroupDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <RadioGroup defaultValue="1" orientation="horizontal">
        <Index each={paymentMethods}>
          {(method) => (
            <RadioGroupItem value={method().value} disabled={method().disabled}>
              {method().label}
            </RadioGroupItem>
          )}
        </Index>
      </RadioGroup>
    </div>
  );
}
