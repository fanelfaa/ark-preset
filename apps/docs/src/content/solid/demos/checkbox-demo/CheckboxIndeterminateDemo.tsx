import { Checkbox, CheckboxLabel } from "@ark-preset/solid";

export default function CheckboxIndeterminateDemo() {
  return (
    <Checkbox checked="indeterminate">
      <CheckboxLabel>Accept terms</CheckboxLabel>
    </Checkbox>
  );
}
