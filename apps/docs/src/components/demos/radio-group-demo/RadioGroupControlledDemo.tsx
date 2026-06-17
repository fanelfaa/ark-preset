import { Index, createSignal } from "solid-js";
import { RadioGroup, RadioGroupItem } from "@ark-preset/solid";

const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit" },
];

export default function RadioGroupControlledDemo() {
  const [value, setValue] = createSignal("1");

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <p class="text-sm text-muted-foreground">Selected: {value()}</p>
      <RadioGroup
        value={value()}
        onValueChange={(e) => setValue(e.value || "1")}
        orientation="horizontal"
      >
        <Index each={paymentMethods}>
          {(method) => <RadioGroupItem value={method().value}>{method().label}</RadioGroupItem>}
        </Index>
      </RadioGroup>
    </div>
  );
}
