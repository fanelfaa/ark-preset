import { DemoWrapper } from "../../DemoWrapper";
import { Switch, SwitchLabel } from "@ark-preset/solid";

export default function SwitchBasicDemo() {
  return (
    <DemoWrapper>
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
    </DemoWrapper>
  );
}
