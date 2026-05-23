import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import { createMemo, splitProps, type Component } from "solid-js";
import { ToggleGroupVariants, toggleGroupVariants } from "@ui/core";

const styles = toggleGroupVariants();

const ToggleGroupRoot: Component<ArkToggleGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkToggleGroup.Root class={rootClass()} {...others} />;
};

const ToggleGroupRootProvider: Component<ArkToggleGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkToggleGroup.RootProvider class={rootClass()} {...others} />;
};

const ToggleGroupItem: Component<ArkToggleGroup.ItemProps & ToggleGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  const itemClass = createMemo(() => styles.item({ class: local.class, size: local.size }));
  return <ArkToggleGroup.Item class={itemClass()} {...others} />;
};

export {
  ToggleGroupRoot as ToggleGroup,
  ToggleGroupRootProvider,
  ToggleGroupItem,
  toggleGroupVariants,
};
