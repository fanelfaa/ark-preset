import { Switch, SwitchLabel } from "@fan-ui/solid";

export default function SwitchBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <Switch>
          <SwitchLabel>Off</SwitchLabel>
        </Switch>
        <Switch defaultChecked>
          <SwitchLabel>On</SwitchLabel>
        </Switch>
        <Switch disabled>
          <SwitchLabel>Disabled</SwitchLabel>
        </Switch>
      </div>
    </div>
  );
}
