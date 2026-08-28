import { Switch, SwitchLabel } from "@ark-preset/solid";

export default function SwitchBasicDemo() {
  return (
    <Switch defaultChecked>
      <SwitchLabel>Enable notifications</SwitchLabel>
    </Switch>
  );
}
