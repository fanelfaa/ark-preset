import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { checkboxVariants } from "@ui/core";

// Global variant instance (no params)
const styles = checkboxVariants();

export { checkboxVariants };

type CheckboxRootProps = CheckboxRootBaseProps & { children?: JSX.Element };

interface CheckboxRootBaseProps extends ArkCheckbox.RootProps {
  class?: string;
}

const CheckboxRoot: Component<CheckboxRootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkCheckbox.Root class={rootClass()} {...others}>
      <ArkCheckbox.Control class={styles.control()}>
        <ArkCheckbox.Indicator class={styles.indicator()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator class={styles.indicator()} indeterminate>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5"
          >
            <path d="M5 12h14" />
          </svg>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.HiddenInput />
      {local.children}
    </ArkCheckbox.Root>
  );
};

const CheckboxLabel: Component<ArkCheckbox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkCheckbox.Label class={labelClass()} {...others} />;
};

export { CheckboxRoot as Checkbox, CheckboxLabel };
