import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import { Switch as SwitchBase } from "./switch.base";
import { switchVariants } from "@fan-ui/core";

const styles = switchVariants();

const SwitchControl = () => (
  <>
    <SwitchBase.Control>
      <SwitchBase.Thumb />
    </SwitchBase.Control>
    <SwitchBase.HiddenInput />
  </>
);

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => (
  <SwitchBase.Label class={styles.label({ class: props.class })} {...props} />
);

const Switch: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SwitchBase.Root class={local.class} {...others}>
      <SwitchControl />
      {local.children}
    </SwitchBase.Root>
  );
};

const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SwitchBase.RootProvider class={local.class} {...others}>
      <SwitchControl />
      {local.children}
    </SwitchBase.RootProvider>
  );
};

export { Switch, SwitchRootProvider, SwitchLabel, SwitchBase };

export { switchVariants, type SwitchVariants } from "@fan-ui/core";
