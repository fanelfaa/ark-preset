import { DemoWrapper } from "../../DemoWrapper";
import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "@ark-preset/solid";
import { Index } from "solid-js";

export default function PinInputBasicDemo() {
  return (
    <DemoWrapper>
      <div class="flex flex-col gap-4">
        <PinInput>
          <PinInputLabel>Label</PinInputLabel>
          <PinInputControl>
            <Index each={[0, 1, 2, 4]}>{(id) => <PinInputInput index={id()} />}</Index>
          </PinInputControl>
        </PinInput>
        <PinInput placeholder="•" mask>
          <PinInputLabel>Masked</PinInputLabel>
          <PinInputControl>
            <Index each={[0, 1, 2, 4]}>{(id) => <PinInputInput index={id()} />}</Index>
          </PinInputControl>
        </PinInput>
      </div>
    </DemoWrapper>
  );
}
