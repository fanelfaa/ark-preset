import { Switch, SwitchLabel } from "@ark-preset/solid";

export default function SwitchDisabledDemo() {
  return (
    <Switch disabled>
      <SwitchLabel>Enable notifications</SwitchLabel>
    </Switch>
  );
}
