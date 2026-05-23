import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
} from "@ui/solid";

export default function RadioGroupBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <RadioGroup defaultValue="1">
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
      </RadioGroup>
    </div>
  );
}
