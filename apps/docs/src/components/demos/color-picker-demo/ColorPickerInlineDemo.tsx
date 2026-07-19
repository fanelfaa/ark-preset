import { ColorPicker } from "@ark-preset/solid";
import { parseColor } from "@ark-ui/solid/color-picker";
import { DemoWrapper } from "../../DemoWrapper";

export default function ColorPickerInlineDemo() {
  return (
    <DemoWrapper>
      <ColorPicker
        inline
        label="Inline Color Picker"
        defaultValue={parseColor("#eb5e41")}
        presets={["#ff0000", "#00ff00", "#0000ff"]}
      />
    </DemoWrapper>
  );
}
