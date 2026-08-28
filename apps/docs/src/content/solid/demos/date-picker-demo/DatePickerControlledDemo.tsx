import { createSignal } from "solid-js";
import { DatePicker } from "@ark-preset/solid";
import { type DateValue } from "@ark-ui/solid/date-picker";

export default function DatePickerControlledDemo() {
  const [value, setValue] = createSignal<DateValue[]>([]);

  return (
    <DatePicker
      label="Select date"
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    />
  );
}
