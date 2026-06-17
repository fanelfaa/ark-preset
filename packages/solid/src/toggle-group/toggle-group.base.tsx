import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import { splitProps, type Component } from "solid-js";
import { toggleGroupVariants, type ToggleGroupVariants } from "@ark-preset/core";

const styles = toggleGroupVariants();

const Root: Component<ArkToggleGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkToggleGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToggleGroup.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Item: Component<ArkToggleGroup.ItemProps & ToggleGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <ArkToggleGroup.Item
      class={styles.item({ class: local.class, size: local.size })}
      {...others}
    />
  );
};

export const ToggleGroup = { Root, RootProvider, Item };
