import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { createMemo, splitProps, type Component } from "solid-js";
import { switchVariants } from "@ui/core";

const styles = switchVariants();

const InnerComponent = () => (
  <>
    <ArkSwitch.Control class={styles.control()}>
      <ArkSwitch.Thumb class={styles.thumb()} />
    </ArkSwitch.Control>
    <ArkSwitch.HiddenInput />
  </>
);

const SwitchRoot: Component<ArkSwitch.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkSwitch.Root class={rootClass()} {...others}>
      <InnerComponent />
      {local.children}
    </ArkSwitch.Root>
  );
};

const SwitchRootProvider: Component<ArkSwitch.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkSwitch.RootProvider class={rootClass()} {...others}>
      <InnerComponent />
      {local.children}
    </ArkSwitch.RootProvider>
  );
};

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkSwitch.Label class={labelClass()} {...others} />;
};

export { SwitchRoot as Switch, SwitchRootProvider, SwitchLabel, switchVariants };
