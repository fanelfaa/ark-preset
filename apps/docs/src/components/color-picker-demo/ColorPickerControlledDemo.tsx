import { createSignal } from "solid-js";
import { ColorPicker } from "@fan-ui/solid";
import { parseColor } from "@ark-ui/solid/color-picker";

export default function ColorPickerControlledDemo() {
  const [color, setColor] = createSignal(parseColor("#eb5e41"));

  return (
    <div class="rounded-lg border border-border p-6">
      <ColorPicker
        label="Color"
        value={color()}
        onValueChange={(e) => setColor(e.value)}
        presets={["#ff0000", "#00ff00", "#0000ff"]}
      />
      <p class="text-sm text-muted-foreground mt-3">
        Current color: <span class="font-mono text-foreground">{color()}</span>
      </p>
    </div>
  );
}
