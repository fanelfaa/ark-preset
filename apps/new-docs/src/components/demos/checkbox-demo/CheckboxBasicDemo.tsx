import { Checkbox, CheckboxLabel } from "@ark-preset/solid";

export default function CheckboxBasicDemo() {
  return (
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
  );
}
