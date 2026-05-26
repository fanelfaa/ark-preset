import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import { splitProps, type Component } from "solid-js";
import { toggleGroupVariants, type ToggleGroupVariants } from "@ui/core";

const styles = toggleGroupVariants();

export const ToggleGroupRoot: Component<ArkToggleGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.Root class={styles.root({ class: local.class })} {...others} />;
};

export const ToggleGroupRootProvider: Component<ArkToggleGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const ToggleGroupItem: Component<ArkToggleGroup.ItemProps & ToggleGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return <ArkToggleGroup.Item class={styles.item({ class: local.class, size: local.size })} {...others} />;
};
