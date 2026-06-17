import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { splitProps, type Component } from "solid-js";
import { Checkbox as CheckboxBase } from "./checkbox.base";

const CheckboxLabel = CheckboxBase.Label;

const CheckboxControl = () => (
  <>
    <CheckboxBase.Control>
      <CheckboxBase.Indicator>
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
      </CheckboxBase.Indicator>
      <CheckboxBase.Indicator indeterminate>
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
      </CheckboxBase.Indicator>
    </CheckboxBase.Control>
    <CheckboxBase.HiddenInput />
  </>
);

const Checkbox: Component<ArkCheckbox.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CheckboxBase.Root class={local.class} {...others}>
      <CheckboxControl />
      {local.children}
    </CheckboxBase.Root>
  );
};

const CheckboxRootProvider: Component<ArkCheckbox.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CheckboxBase.RootProvider class={local.class} {...others}>
      <CheckboxControl />
      {local.children}
    </CheckboxBase.RootProvider>
  );
};

export { Checkbox, CheckboxRootProvider, CheckboxLabel, CheckboxBase };

export { checkboxVariants, type CheckboxVariants } from "@ark-preset/core";
