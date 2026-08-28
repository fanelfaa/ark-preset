import { Portal } from "solid-js/web";
import { parseColor } from "@ark-ui/solid/color-picker";
import { ColorPickerBase } from "@ark-preset/solid";

export default function ColorPickerAdvancedDemo() {
  return (
    <ColorPickerBase.Root defaultValue={parseColor("#eb5e41")}>
      <ColorPickerBase.Label>Custom Color Picker</ColorPickerBase.Label>
      <ColorPickerBase.Control>
        {/* Custom trigger setup */}
        <ColorPickerBase.Trigger>
          <ColorPickerBase.TransparencyGrid />
          <ColorPickerBase.ValueSwatch />
        </ColorPickerBase.Trigger>
        <ColorPickerBase.ChannelInput channel="hex" />
      </ColorPickerBase.Control>

      <Portal>
        <ColorPickerBase.Positioner>
          <ColorPickerBase.Content>
            <ColorPickerBase.Area>
              <ColorPickerBase.AreaBackground />
              <ColorPickerBase.AreaThumb />
            </ColorPickerBase.Area>

            <div class="flex flex-col gap-3 mt-3">
              <ColorPickerBase.ChannelSlider channel="hue">
                <ColorPickerBase.ChannelSliderTrack />
                <ColorPickerBase.ChannelSliderThumb />
              </ColorPickerBase.ChannelSlider>

              <ColorPickerBase.ChannelSlider channel="alpha">
                <ColorPickerBase.TransparencyGrid />
                <ColorPickerBase.ChannelSliderTrack />
                <ColorPickerBase.ChannelSliderThumb />
              </ColorPickerBase.ChannelSlider>
            </div>
          </ColorPickerBase.Content>
        </ColorPickerBase.Positioner>
      </Portal>

      <ColorPickerBase.HiddenInput />
    </ColorPickerBase.Root>
  );
}
