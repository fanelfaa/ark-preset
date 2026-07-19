import { DatePicker, Separator } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function DatePickerBasicDemo() {
  return (
    <DemoWrapper class="space-y-4">
      <DatePicker class="flex flex-col gap-1.5" label="Birth date" />
      <DatePicker class="flex flex-col gap-1.5" label="Select date" placeholder="Pick a date" />
      <DatePicker class="flex flex-col gap-1.5" label="Birth date" error />
      <DatePicker class="flex flex-col gap-1.5" label="Select date" clearLabel="清除" />
      <Separator />
      <DatePicker
        class="flex flex-col gap-1.5"
        selectionMode="range"
        label="Date range"
        placeholder="Start date"
      />
      <DatePicker
        class="flex flex-col gap-1.5"
        selectionMode="multiple"
        label="Multiple dates"
        placeholder="Select dates..."
      />
    </DemoWrapper>
  );
}
