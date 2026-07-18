import { useCheckbox } from "@ark-ui/solid/checkbox";
import { CheckboxRootProvider, CheckboxLabel } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function CheckboxRootProviderDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <DemoWrapper class="space-y-4">
      <output class="block text-sm text-muted-foreground">
        Checked: {JSON.stringify(checkbox().checked)}
      </output>

      <CheckboxRootProvider value={checkbox}>
        <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
      </CheckboxRootProvider>
    </DemoWrapper>
  );
}
