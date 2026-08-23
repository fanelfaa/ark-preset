import { ColorPicker } from "@ark-preset/solid";
import { parseColor } from "@ark-ui/solid/color-picker";

export default function ColorPickerInlineDemo() {
  return (
    <div>
      <ColorPicker
        inline
        label="Inline Color Picker"
        defaultValue={parseColor("#eb5e41")}
        presets={["#ff0000", "#00ff00", "#0000ff"]}
      />
    </div>
  );
}
