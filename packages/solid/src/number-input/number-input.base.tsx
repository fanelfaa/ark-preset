import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { splitProps, type Component } from "solid-js";
import { numberInputVariants } from "@ark-preset/core";
import { HTMLProps } from "@ark-ui/solid";

const styles = numberInputVariants();

const NumberInputRoot: Component<ArkNumberInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Root class={styles.root({ class: local.class })} {...others} />;
};

const NumberInputLabel: Component<ArkNumberInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const NumberInputControl: Component<ArkNumberInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Control class={styles.control({ class: local.class })} {...others} />;
};

const NumberInputInput: Component<ArkNumberInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const NumberInputIncrementTrigger: Component<ArkNumberInput.IncrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkNumberInput.IncrementTrigger
      class={styles.incrementTrigger({ class: local.class })}
      {...others}
    />
  );
};

const NumberInputDecrementTrigger: Component<ArkNumberInput.DecrementTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkNumberInput.DecrementTrigger
      class={styles.decrementTrigger({ class: local.class })}
      {...others}
    />
  );
};

const NumberInputScrubber: Component<ArkNumberInput.ScrubberProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.Scrubber class={styles.scrubber({ class: local.class })} {...others} />;
};

const NumberInputTriggerGroup: Component<HTMLProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={styles.triggerGroup({ class: local.class })} {...others} />;
};

const NumberInputValueText: Component<ArkNumberInput.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkNumberInput.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

export const NumberInput = {
  Root: NumberInputRoot,
  Label: NumberInputLabel,
  Control: NumberInputControl,
  Input: NumberInputInput,
  IncrementTrigger: NumberInputIncrementTrigger,
  DecrementTrigger: NumberInputDecrementTrigger,
  Scrubber: NumberInputScrubber,
  TriggerGroup: NumberInputTriggerGroup,
  ValueText: NumberInputValueText,
};
