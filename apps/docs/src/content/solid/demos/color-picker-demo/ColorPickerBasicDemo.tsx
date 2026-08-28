import { ColorPicker } from "@ark-preset/solid";

export default function ColorPickerBasicDemo() {
  return <ColorPicker label="Color" presets={["#ff0000", "#00ff00", "#0000ff"]} />;
}
