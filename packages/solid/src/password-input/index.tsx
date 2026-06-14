import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { splitProps, type Component } from "solid-js";
import { PasswordInput as PasswordInputBase } from "./password-input.base";

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

const PasswordInputControl: Component<ArkPasswordInput.InputProps> = (props) => (
  <PasswordInputBase.Control>
    <PasswordInputBase.Field {...props} />
    <PasswordInputBase.VisibilityTrigger>
      <PasswordInputBase.Indicator fallback={<EyeOffIcon />}>
        <EyeIcon />
      </PasswordInputBase.Indicator>
    </PasswordInputBase.VisibilityTrigger>
  </PasswordInputBase.Control>
);

const PasswordInput: Component<
  ArkPasswordInput.RootProps & { label?: string; placeholder?: string }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <PasswordInputBase.Root class={local.class} {...others}>
      {local.label && <PasswordInputBase.Label>{local.label}</PasswordInputBase.Label>}
      <PasswordInputControl placeholder={local.placeholder} />
    </PasswordInputBase.Root>
  );
};

const PasswordInputRootProvider: Component<
  ArkPasswordInput.RootProviderProps & { label?: string; placeholder?: string }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "children", "placeholder"]);
  return (
    <PasswordInputBase.RootProvider class={local.class} {...others}>
      {local.label && <PasswordInputBase.Label>{local.label}</PasswordInputBase.Label>}
      <PasswordInputControl placeholder={local.placeholder} />
    </PasswordInputBase.RootProvider>
  );
};

export { PasswordInput, PasswordInputRootProvider, PasswordInputBase };

export { passwordInputVariants, type PasswordInputVariants } from "@fan-ui/core";
