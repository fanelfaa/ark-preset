import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { createMemo, splitProps, type Component } from "solid-js";
import { checkboxVariants } from "@ui/core";

const styles = checkboxVariants();

const InnerComponent = () => (
  <>
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
  </>
);

const CheckboxRoot: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkCheckbox.Root class={rootClass()} {...others}>
      <InnerComponent />
      {local.children}
    </ArkCheckbox.Root>
  );
};

const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return (
    <ArkCheckbox.RootProvider class={rootClass()} {...others}>
      <InnerComponent />
      {local.children}
    </ArkCheckbox.RootProvider>
  );
};

const CheckboxLabel: Component<ArkCheckbox.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const labelClass = createMemo(() => styles.label({ class: local.class }));
  return <ArkCheckbox.Label class={labelClass()} {...others} />;
};

export { CheckboxRoot as Checkbox, CheckboxRootProvider, CheckboxLabel, checkboxVariants };
