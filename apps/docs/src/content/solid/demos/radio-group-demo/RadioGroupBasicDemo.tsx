import { RadioGroup, RadioGroupItem } from "@ark-preset/solid";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup defaultValue="1" orientation="horizontal">
      <RadioGroupItem value="1">Credit Card</RadioGroupItem>
      <RadioGroupItem value="2">Paypal</RadioGroupItem>
      <RadioGroupItem value="3">Debit</RadioGroupItem>
    </RadioGroup>
  );
}
