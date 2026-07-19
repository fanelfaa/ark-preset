import { createSignal } from "solid-js";
import { ColorPicker } from "@ark-preset/solid";
import { parseColor } from "@ark-ui/solid/color-picker";
import { DemoWrapper } from "../../DemoWrapper";

export default function ColorPickerControlledDemo() {
  const [color, setColor] = createSignal(parseColor("#eb5e41"));

  return (
    <DemoWrapper>
      <ColorPicker
        label="Color"
        value={color()}
        onValueChange={(e) => setColor(e.value)}
        presets={["#ff0000", "#00ff00", "#0000ff"]}
      />
      <p class="text-sm text-muted-foreground mt-3">
        Current color: <span class="font-mono text-foreground">{color().toString()}</span>
      </p>
    </DemoWrapper>
  );
}
