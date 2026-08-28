import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "@ark-preset/solid";
import { Index } from "solid-js";

export default function PinInputMaskedDemo() {
  return (
    <PinInput placeholder="•" mask>
      <PinInputLabel>PIN</PinInputLabel>
      <PinInputControl>
        <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
      </PinInputControl>
    </PinInput>
  );
}
