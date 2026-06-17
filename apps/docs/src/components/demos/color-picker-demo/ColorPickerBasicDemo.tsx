import { ColorPicker } from "@ark-preset/solid";
import { parseColor } from "@ark-ui/solid/color-picker";

export default function ColorPickerBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <ColorPicker
        label="Color"
        defaultValue={parseColor("#eb5e41")}
        presets={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]}
      />
    </div>
  );
}
