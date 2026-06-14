import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { splitProps, type Component } from "solid-js";
import { NumberInput as NumberInputBase } from "./number-input.base";

const NumberInputControl = () => (
  <>
    <NumberInputBase.Control>
      <NumberInputBase.Input />
      <NumberInputBase.TriggerGroup>
        <NumberInputBase.IncrementTrigger>
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
        </NumberInputBase.IncrementTrigger>
        <NumberInputBase.DecrementTrigger>
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
        </NumberInputBase.DecrementTrigger>
      </NumberInputBase.TriggerGroup>
    </NumberInputBase.Control>
    <NumberInputBase.Scrubber>
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
    </NumberInputBase.Scrubber>
  </>
);

type NumberInputProps = Omit<ArkNumberInput.RootProps, "children"> & {
  label?: string;
  class?: string;
  error?: boolean;
};

const NumberInput: Component<NumberInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "disabled", "error"]);
  return (
    <NumberInputBase.Root class={local.class} disabled={local.disabled} {...others}>
      {local.label && <NumberInputBase.Label>{local.label}</NumberInputBase.Label>}
      <NumberInputControl />
    </NumberInputBase.Root>
  );
};

export { NumberInput, NumberInputBase };

export { numberInputVariants, type NumberInputVariants } from "@fan-ui/core";
