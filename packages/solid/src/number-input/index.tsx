import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { splitProps, type Component } from "solid-js";
import {
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRoot,
  NumberInputScrubber,
  NumberInputTriggerGroup,
} from "./number-input.base";

type NumberInputProps = Omit<ArkNumberInput.RootProps, "children"> & {
  label?: string;
  class?: string;
  error?: boolean;
};

const InnerComponent = () => (
  <>
    <NumberInputControl>
      <NumberInputInput />
      <NumberInputTriggerGroup>
        <NumberInputIncrementTrigger>
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
            <path d="m18 15-6-6-6 6" />
          </svg>
        </NumberInputIncrementTrigger>
        <NumberInputDecrementTrigger>
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </NumberInputDecrementTrigger>
      </NumberInputTriggerGroup>
    </NumberInputControl>
    <NumberInputScrubber>
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
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </NumberInputScrubber>
  </>
);

export const NumberInput: Component<NumberInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "disabled", "error"]);
  return (
    <NumberInputRoot class={local.class} disabled={local.disabled} {...others}>
      {local.label && <NumberInputLabel>{local.label}</NumberInputLabel>}
      <InnerComponent />
    </NumberInputRoot>
  );
};

export * from "./number-input.base";

export { numberInputVariants, type NumberInputVariants } from "@ui/core";
