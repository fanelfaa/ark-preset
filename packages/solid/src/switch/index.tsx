import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot as SwitchRootBase,
  SwitchRootProvider as BaseSwitchRootProvider,
  SwitchThumb,
} from "./switch.base";

const InnerComponent = () => (
  <>
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchHiddenInput />
  </>
);

export const Switch: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <SwitchRootBase class={local.class} {...others}>
      <InnerComponent />
      {local.children}
    </SwitchRootBase>
  );
};

export const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <BaseSwitchRootProvider class={local.class} {...others}>
      <InnerComponent />
      {local.children}
    </BaseSwitchRootProvider>
  );
};

export * from "./switch.base";

export { switchVariants, type SwitchVariants } from "@ui/core";
