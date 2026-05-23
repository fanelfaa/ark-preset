import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { switchVariants } from "@ui/core";

type SwitchProps = SwitchBaseProps & { children?: JSX.Element };

interface SwitchBaseProps extends ArkSwitch.RootProps {
  class?: string;
}
const styles = switchVariants();

const SwitchRoot: Component<SwitchProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkSwitch.Root class={rootClass()} {...others}>
      <ArkSwitch.Control class={styles.control()}>
        <ArkSwitch.Thumb class={styles.thumb()} />
      </ArkSwitch.Control>
      <ArkSwitch.HiddenInput />
      {local.children}
    </ArkSwitch.Root>
  );
};

const SwitchLabel: Component<ArkSwitch.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkSwitch.Label class={labelClass()} {...others} />;
};

export { SwitchRoot as Switch, SwitchLabel, switchVariants };
