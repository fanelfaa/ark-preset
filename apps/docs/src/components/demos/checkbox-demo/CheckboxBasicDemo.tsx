import { Checkbox, CheckboxLabel } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function CheckboxBasicDemo() {
  return (
    <DemoWrapper>
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
    </DemoWrapper>
  );
}
