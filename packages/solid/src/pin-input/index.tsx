import { PinInput as PinInputBase } from "./pin-input.base";

const PinInput = PinInputBase.Root;
const PinInputRootProvider = PinInputBase.RootProvider;
const PinInputControl = PinInputBase.Control;
const PinInputInput = PinInputBase.Input;
const PinInputLabel = PinInputBase.Label;

export {
  PinInput,
  PinInputRootProvider,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  PinInputBase,
};

export { pinInputVariants, type PinInputVariants } from "@fan-ui/core";
