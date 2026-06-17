import { For, Show, splitProps, type Component, type JSX } from "solid-js";
import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/solid/color-picker";
import { Portal } from "solid-js/web";
import { ColorPickerBase } from "./color-picker.base";

const CheckIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-4"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
    <title>Check</title>
  </svg>
);

// ── Composite: ColorPicker ───────────────────────────────────

type ColorPickerProps = ArkColorPicker.RootProps & {
  label?: string;
  presets?: string[];
  inline?: boolean;
};

const PickerContent: Component<{ presets?: string[]; children?: JSX.Element }> = (props) => {
  const presetColors = () => props.presets?.map((c) => parseColor(c));
  return (
    <ColorPickerBase.Content>
      <ColorPickerBase.Area>
        <ColorPickerBase.AreaBackground />
        <ColorPickerBase.AreaThumb />
      </ColorPickerBase.Area>
      <ColorPickerBase.ChannelSlider channel="hue">
        <ColorPickerBase.ChannelSliderTrack />
        <ColorPickerBase.ChannelSliderThumb />
      </ColorPickerBase.ChannelSlider>
      <ColorPickerBase.FormatSelect />
      <ColorPickerBase.ChannelInput channel="hex" />
      <Show when={presetColors()}>
        <ColorPickerBase.SwatchGroup>
          <For each={presetColors()}>
            {(color) => (
              <ColorPickerBase.SwatchTrigger value={color}>
                <ColorPickerBase.Swatch value={color}>
                  <ColorPickerBase.SwatchIndicator>
                    <CheckIcon />
                  </ColorPickerBase.SwatchIndicator>
                </ColorPickerBase.Swatch>
              </ColorPickerBase.SwatchTrigger>
            )}
          </For>
        </ColorPickerBase.SwatchGroup>
      </Show>
      {props.children}
    </ColorPickerBase.Content>
  );
};

const ColorPicker: Component<ColorPickerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "presets", "inline", "children"]);

  return (
    <ColorPickerBase.Root class={local.class} {...others}>
      <Show when={local.label}>
        <ColorPickerBase.Label>{local.label}</ColorPickerBase.Label>
      </Show>
      <ColorPickerBase.Control>
        <ColorPickerBase.ChannelInput channel="hex" />
        <ColorPickerBase.Trigger>
          <ColorPickerBase.TransparencyGrid />
          <ColorPickerBase.ValueSwatch />
        </ColorPickerBase.Trigger>
      </ColorPickerBase.Control>
      <Show
        when={local.inline}
        fallback={
          <Portal>
            <ColorPickerBase.Positioner>
              <PickerContent presets={local.presets}>{local.children}</PickerContent>
            </ColorPickerBase.Positioner>
          </Portal>
        }
      >
        <PickerContent presets={local.presets}>{local.children}</PickerContent>
      </Show>
      <ColorPickerBase.HiddenInput />
    </ColorPickerBase.Root>
  );
};

// ── Exports ──────────────────────────────────────────────────

export { ColorPicker, ColorPickerBase };

export { colorPickerVariants, type ColorPickerVariants } from "@ark-preset/core";
