import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import { switchVariants } from "@fan-ui/core";

const styles = switchVariants();

const SwitchRoot: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Root class={styles.root({ class: local.class })} {...others} />;
};

const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const SwitchControl: Component<ArkSwitch.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Control class={styles.control({ class: local.class })} {...others} />;
};

const SwitchThumb: Component<ArkSwitch.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Thumb class={styles.thumb({ class: local.class })} {...others} />;
};

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Label class={styles.label({ class: local.class })} {...others} />;
};

const SwitchHiddenInput = ArkSwitch.HiddenInput;

export const Switch = {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  HiddenInput: SwitchHiddenInput,
};
