import { useSwitch } from "@ark-ui/solid/switch";
import { SwitchRootProvider, SwitchLabel } from "@ui/solid";

export default function SwitchRootProviderDemo() {
  const sw = useSwitch({ defaultChecked: true });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Checked: {JSON.stringify(sw().checked)}
      </output>

      <SwitchRootProvider value={sw}>
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchRootProvider>
    </div>
  );
}
