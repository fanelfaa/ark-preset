import { DemoWrapper } from "../../DemoWrapper";
import { useSwitch } from "@ark-ui/solid/switch";
import { SwitchRootProvider, SwitchLabel } from "@ark-preset/solid";

export default function SwitchRootProviderDemo() {
  const sw = useSwitch({ defaultChecked: true });

  return (
    <DemoWrapper class="space-y-4">
      <output class="block text-sm text-muted-foreground">
        Checked: {JSON.stringify(sw().checked)}
      </output>

      <SwitchRootProvider value={sw}>
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchRootProvider>
    </DemoWrapper>
  );
}
