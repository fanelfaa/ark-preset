import { Checkbox, CheckboxLabel } from "@ui/solid";

export default function CheckboxBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <Checkbox defaultChecked>
          <CheckboxLabel>Checked</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxLabel>Unchecked</CheckboxLabel>
        </Checkbox>
        <Checkbox checked="indeterminate">
          <CheckboxLabel>Indeterminate</CheckboxLabel>
        </Checkbox>
        <Checkbox disabled>
          <CheckboxLabel>Disabled</CheckboxLabel>
        </Checkbox>
      </div>
    </div>
  );
}
