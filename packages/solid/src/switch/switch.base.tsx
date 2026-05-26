import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { splitProps, type Component } from "solid-js";
import { switchVariants } from "@ui/core";

const styles = switchVariants();

export const SwitchRoot: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Root class={styles.root({ class: local.class })} {...others} />;
};

export const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const SwitchControl: Component<ArkSwitch.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Control class={styles.control({ class: local.class })} {...others} />;
};

export const SwitchThumb: Component<ArkSwitch.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Thumb class={styles.thumb({ class: local.class })} {...others} />;
};

export const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.Label class={styles.label({ class: local.class })} {...others} />;
};

export const SwitchHiddenInput: Component<ArkSwitch.HiddenInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSwitch.HiddenInput class={local.class} {...others} />;
};
