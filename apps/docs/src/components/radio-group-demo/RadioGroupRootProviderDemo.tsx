import { Index, createMemo } from "solid-js";
import { RadioGroupBase, RadioGroupItem } from "@fan-ui/solid";
import { useRadioGroup } from "@ark-ui/solid/radio-group";

const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit" },
];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({ defaultValue: "1" });
  const value = createMemo(() => radioGroup().value);

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">Value: {JSON.stringify(value())}</output>
      <RadioGroupBase.RootProvider value={radioGroup} orientation="horizontal">
        <RadioGroupBase.Label>Payment Method</RadioGroupBase.Label>
        <Index each={paymentMethods}>
          {(method) => <RadioGroupItem value={method().value}>{method().label} </RadioGroupItem>}
        </Index>
      </RadioGroupBase.RootProvider>
    </div>
  );
}
