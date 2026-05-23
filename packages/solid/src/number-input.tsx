import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { createMemo, splitProps, type Component } from "solid-js";
import { numberInputVariants } from "@ui/core";

type NumberInputProps = ArkNumberInput.RootProps & {
  label?: string;
  class?: string;
  error?: boolean;
};

const NumberInput: Component<NumberInputProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "class", "disabled", "error"]);
  const styles = createMemo(() =>
    numberInputVariants({ disabled: local.disabled, invalid: local.error } as any),
  );
  const rootClass = createMemo(() => styles().root({ class: local.class }));

  return (
    <ArkNumberInput.Root class={rootClass()} disabled={local.disabled} {...others}>
      {local.label && (
        <ArkNumberInput.Label class={styles().label()}>{local.label}</ArkNumberInput.Label>
      )}
      <NumberInputControl>
        <ArkNumberInput.Input class={styles().input()} />
        <div class={styles().triggerGroup()}>
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
        </div>
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
    </ArkNumberInput.Root>
  );
};

const NumberInputControl: Component<ArkNumberInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = numberInputVariants();
  const controlClass = createMemo(() => styles.control({ class: local.class }));
  return (
    <ArkNumberInput.Control class={controlClass()} {...others}>
      {local.children}
    </ArkNumberInput.Control>
  );
};

const NumberInputIncrementTrigger: Component<ArkNumberInput.IncrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = numberInputVariants();
  const triggerClass = createMemo(() => styles.incrementTrigger({ class: local.class }));
  return (
    <ArkNumberInput.IncrementTrigger class={triggerClass()} {...others}>
      {local.children}
    </ArkNumberInput.IncrementTrigger>
  );
};

const NumberInputDecrementTrigger: Component<ArkNumberInput.DecrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = numberInputVariants();
  const triggerClass = createMemo(() => styles.decrementTrigger({ class: local.class }));
  return (
    <ArkNumberInput.DecrementTrigger class={triggerClass()} {...others}>
      {local.children}
    </ArkNumberInput.DecrementTrigger>
  );
};

const NumberInputScrubber: Component<ArkNumberInput.ScrubberProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const styles = numberInputVariants();
  const scrubberClass = createMemo(() => styles.scrubber({ class: local.class }));
  return (
    <ArkNumberInput.Scrubber class={scrubberClass()} {...others}>
      {local.children}
    </ArkNumberInput.Scrubber>
  );
};

export {
  NumberInput,
  NumberInputControl,
  NumberInputIncrementTrigger,
  NumberInputDecrementTrigger,
  NumberInputScrubber,
  numberInputVariants,
};
