import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { splitProps, type Component } from "solid-js";
import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxRoot,
  CheckboxRootProvider as BaseCheckboxRootProvider,
} from "./checkbox.base";

const InnerComponent = () => (
  <>
    <CheckboxControl>
      <CheckboxIndicator>
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
      </CheckboxIndicator>
      <CheckboxIndicator indeterminate>
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
      </CheckboxIndicator>
    </CheckboxControl>
    <CheckboxHiddenInput />
  </>
);

export const Checkbox: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CheckboxRoot class={local.class} {...others}>
      <InnerComponent />
      {local.children}
    </CheckboxRoot>
  );
};

export const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <BaseCheckboxRootProvider class={local.class} {...others}>
      <InnerComponent />
      {local.children}
    </BaseCheckboxRootProvider>
  );
};

export * from "./checkbox.base";

export { checkboxVariants, type CheckboxVariants } from "@ui/core";
