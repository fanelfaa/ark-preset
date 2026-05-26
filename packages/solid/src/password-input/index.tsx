import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { splitProps, type Component } from "solid-js";
import {
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputLabel,
  PasswordInputRoot,
  PasswordInputRootProvider as BasePasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
} from "./password-input.base";

const EyeIcon: Component = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon: Component = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const InnerComponent: Component<ArkPasswordInput.InputProps> = (props) => (
  <PasswordInputControl>
    <PasswordInputField {...props} />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator fallback={<EyeOffIcon />}>
        <EyeIcon />
      </PasswordInputIndicator>
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
);

export const PasswordInput: Component<
  ArkPasswordInput.RootProps & { label?: string; placeholder?: string }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <PasswordInputRoot class={local.class} {...others}>
      {local.label && <PasswordInputLabel>{local.label}</PasswordInputLabel>}
      <InnerComponent placeholder={local.placeholder} />
    </PasswordInputRoot>
  );
};

export const PasswordInputRootProvider: Component<
  ArkPasswordInput.RootProviderProps & { label?: string; placeholder?: string }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <BasePasswordInputRootProvider class={local.class} {...others}>
      {local.label && <PasswordInputLabel>{local.label}</PasswordInputLabel>}
      <InnerComponent placeholder={local.placeholder} />
    </BasePasswordInputRootProvider>
  );
};

export * from "./password-input.base";

export { passwordInputVariants, type PasswordInputVariants } from "@ui/core";
