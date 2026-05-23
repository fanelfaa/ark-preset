import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupIndicator,
} from "@ui/solid";

export default function RadioGroupBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <RadioGroup defaultValue="1">
        <RadioGroupLabel>Payment Method</RadioGroupLabel>
        <RadioGroupItem value="1">
          <RadioGroupItemControl>
            <RadioGroupIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemText>Credit Card</RadioGroupItemText>
        </RadioGroupItem>
        <RadioGroupItem value="2">
          <RadioGroupItemControl>
            <RadioGroupIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemText>PayPal</RadioGroupItemText>
        </RadioGroupItem>
        <RadioGroupItem value="3">
          <RadioGroupItemControl>
            <RadioGroupIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemText>Bank Transfer</RadioGroupItemText>
        </RadioGroupItem>
      </RadioGroup>
    </div>
  );
}
