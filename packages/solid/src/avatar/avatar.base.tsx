import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { splitProps, type Component } from "solid-js";
import { avatarVariants } from "@ui/core";

const styles = avatarVariants();

const Root: Component<ArkAvatar.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkAvatar.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Fallback: Component<ArkAvatar.FallbackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Fallback class={styles.fallback({ class: local.class })} {...others} />;
};

const Image: Component<ArkAvatar.ImageProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Image class={styles.image({ class: local.class })} {...others} />;
};

export const Avatar = { Root, RootProvider, Fallback, Image };
