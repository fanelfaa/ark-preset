import { useCheckbox } from "@ark-ui/solid/checkbox";
import { CheckboxRootProvider, CheckboxLabel } from "@fan-ui/solid";

export default function CheckboxRootProviderDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Checked: {JSON.stringify(checkbox().checked)}
      </output>

      <CheckboxRootProvider value={checkbox}>
        <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
      </CheckboxRootProvider>
    </div>
  );
}
