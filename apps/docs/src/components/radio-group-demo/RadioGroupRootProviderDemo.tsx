import { useRadioGroup } from "@ark-ui/solid/radio-group";
import {
  RadioGroupRootProvider,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
} from "@ui/solid";

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({ defaultValue: "1" });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(radioGroup().value)}
      </output>

      <RadioGroupRootProvider value={radioGroup}>
        <RadioGroupLabel>Payment Method</RadioGroupLabel>
        <RadioGroupItem value="1">
          <RadioGroupItemControl />
          <RadioGroupItemText>Credit Card</RadioGroupItemText>
        </RadioGroupItem>
        <RadioGroupItem value="2">
          <RadioGroupItemControl />
          <RadioGroupItemText>Paypal</RadioGroupItemText>
        </RadioGroupItem>
        <RadioGroupItem value="3">
          <RadioGroupItemControl />
          <RadioGroupItemText>Debit</RadioGroupItemText>
        </RadioGroupItem>
      </RadioGroupRootProvider>
    </div>
  );
}
