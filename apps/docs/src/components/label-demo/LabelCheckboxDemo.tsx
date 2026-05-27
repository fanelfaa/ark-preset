import { Label, Checkbox } from "@ui/solid";

export default function LabelCheckboxDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex items-center gap-2">
        <Checkbox id="label-checkbox-demo" />
        <Label for="label-checkbox-demo">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
