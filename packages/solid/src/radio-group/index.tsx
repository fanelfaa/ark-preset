import { splitProps, type Component } from "solid-js";
import { RadioGroup as RadioGroupBase } from "./radio-group.base";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupVariants } from "@ark-preset/core";

const RadioGroup: Component<ArkRadioGroup.RootProps & RadioGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation", "children"]);
  return (
    <RadioGroupBase.Root orientation={local.orientation} {...others}>
      <RadioGroupBase.Indicator />
      {local.children}
    </RadioGroupBase.Root>
  );
};

const RadioGroupItem: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <RadioGroupBase.Item {...others}>
      <RadioGroupBase.ItemText>{local.children}</RadioGroupBase.ItemText>
      <RadioGroupBase.ItemControl />
      <RadioGroupBase.ItemHiddenInput />
    </RadioGroupBase.Item>
  );
};

export { RadioGroup, RadioGroupItem, RadioGroupBase };

export { radioGroupVariants, type RadioGroupVariants } from "@ark-preset/core";
