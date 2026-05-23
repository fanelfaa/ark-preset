import { usePinInput } from "@ark-ui/solid/pin-input";
import { PinInputRootProvider, PinInputControl, PinInputInput, PinInputLabel } from "@ui/solid";
import { Index } from "solid-js";

export default function PinInputRootProviderDemo() {
  const pinInput = usePinInput();

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(pinInput().value)}
      </output>

      <PinInputRootProvider value={pinInput}>
        <PinInputLabel>Code</PinInputLabel>
        <PinInputControl>
          <Index each={[0, 1, 2, 3]}>{(id) => <PinInputInput index={id()} />}</Index>
        </PinInputControl>
      </PinInputRootProvider>
    </div>
  );
}
