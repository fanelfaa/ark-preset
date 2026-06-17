import { ColorPicker as ArkColorPicker } from "@ark-ui/solid/color-picker";
import { splitProps, type Component } from "solid-js";
import { colorPickerVariants } from "@ark-preset/core";

const styles = colorPickerVariants();

// ── Root (styled, with size + inline variants) ──────────────

const Root: Component<ArkColorPicker.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Root class={styles.root({ class: local.class })} {...others} />;
};
const RootProvider = ArkColorPicker.RootProvider;

// ── Label ────────────────────────────────────────────────────

const Label: Component<ArkColorPicker.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Label class={styles.label({ class: local.class })} {...others} />;
};

// ── Control ──────────────────────────────────────────────────

const Control: Component<ArkColorPicker.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Control class={styles.control({ class: local.class })} {...others} />;
};

// ── Trigger ──────────────────────────────────────────────────

const Trigger: Component<ArkColorPicker.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

// ── Hidden Input (pass-through) ─────────────────────────────

const HiddenInput = ArkColorPicker.HiddenInput;

// ── Positioner (pass-through) ───────────────────────────────

const Positioner = ArkColorPicker.Positioner;

// ── Content ─────────────────────────────────────────────────

const Content: Component<ArkColorPicker.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Content class={styles.content({ class: local.class })} {...others} />;
};

// ── Area ─────────────────────────────────────────────────────

const Area: Component<ArkColorPicker.AreaProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Area class={styles.area({ class: local.class })} {...others} />;
};

// ── Area Background ───────────────────────────────────────────

const AreaBackground: Component<ArkColorPicker.AreaBackgroundProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.AreaBackground
      class={styles.areaBackground({ class: local.class })}
      {...others}
    />
  );
};

// ── Area Thumb ───────────────────────────────────────────────

const AreaThumb: Component<ArkColorPicker.AreaThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.AreaThumb class={styles.areaThumb({ class: local.class })} {...others} />;
};

// ── Channel Slider ───────────────────────────────────────────

const ChannelSlider: Component<ArkColorPicker.ChannelSliderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ChannelSlider
      class={styles.channelSlider({ class: local.class })}
      {...others}
    />
  );
};

// ── Channel Slider Track ─────────────────────────────────────

const ChannelSliderTrack: Component<ArkColorPicker.ChannelSliderTrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ChannelSliderTrack
      class={styles.channelSliderTrack({ class: local.class })}
      {...others}
    />
  );
};

// ── Channel Slider Thumb ─────────────────────────────────────

const ChannelSliderThumb: Component<ArkColorPicker.ChannelSliderThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ChannelSliderThumb
      class={styles.channelSliderThumb({ class: local.class })}
      {...others}
    />
  );
};

// ── Channel Slider Label ─────────────────────────────────────

const ChannelSliderLabel: Component<ArkColorPicker.ChannelSliderLabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ChannelSliderLabel
      class={styles.channelSliderLabel({ class: local.class })}
      {...others}
    />
  );
};

// ── Channel Slider Value Text (pass-through) ────────────────

const ChannelSliderValueText = ArkColorPicker.ChannelSliderValueText;

// ── Channel Input ────────────────────────────────────────────

const ChannelInput: Component<ArkColorPicker.ChannelInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ChannelInput class={styles.channelInput({ class: local.class })} {...others} />
  );
};

// ── Value Swatch ─────────────────────────────────────────────

const ValueSwatch: Component<ArkColorPicker.ValueSwatchProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.ValueSwatch class={styles.valueSwatch({ class: local.class })} {...others} />
  );
};

// ── Value Text (pass-through) ───────────────────────────────

const ValueText = ArkColorPicker.ValueText;

// ── Eye Dropper Trigger ─────────────────────────────────────

const EyeDropperTrigger: Component<ArkColorPicker.EyeDropperTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.EyeDropperTrigger
      class={styles.eyeDropperTrigger({ class: local.class })}
      {...others}
    />
  );
};

// ── Format Select ────────────────────────────────────────────

const FormatSelect: Component<ArkColorPicker.FormatSelectProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.FormatSelect class={styles.formatSelect({ class: local.class })} {...others} />
  );
};

// ── Format Trigger ───────────────────────────────────────────

const FormatTrigger: Component<ArkColorPicker.FormatTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.FormatTrigger
      class={styles.formatTrigger({ class: local.class })}
      {...others}
    />
  );
};

// ── Swatch Group ─────────────────────────────────────────────

const SwatchGroup: Component<ArkColorPicker.SwatchGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.SwatchGroup class={styles.swatchGroup({ class: local.class })} {...others} />
  );
};

// ── Swatch ───────────────────────────────────────────────────

const Swatch: Component<ArkColorPicker.SwatchProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Swatch class={styles.swatch({ class: local.class })} {...others} />;
};

// ── Swatch Indicator ─────────────────────────────────────────

const SwatchIndicator: Component<ArkColorPicker.SwatchIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.SwatchIndicator
      class={styles.swatchIndicator({ class: local.class })}
      {...others}
    />
  );
};

// ── Swatch Trigger ───────────────────────────────────────────

const SwatchTrigger: Component<ArkColorPicker.SwatchTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.SwatchTrigger class={styles.swatch({ class: local.class })} {...others} />;
};

// ── Transparency Grid ────────────────────────────────────────

const TransparencyGrid: Component<ArkColorPicker.TransparencyGridProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkColorPicker.TransparencyGrid
      class={styles.transparencyGrid({ class: local.class })}
      {...others}
    />
  );
};

// ── View ─────────────────────────────────────────────────────

const View: Component<ArkColorPicker.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.View class={styles.view({ class: local.class })} {...others} />;
};

// ── Context (pass-through) ──────────────────────────────────

const Context = ArkColorPicker.Context;

// ── Namespace Export ────────────────────────────────────────

export const ColorPickerBase = {
  Root,
  RootProvider,
  Label,
  Control,
  Trigger,
  HiddenInput,
  Positioner,
  Content,
  Area,
  AreaBackground,
  AreaThumb,
  ChannelSlider,
  ChannelSliderTrack,
  ChannelSliderThumb,
  ChannelSliderLabel,
  ChannelSliderValueText,
  ChannelInput,
  ValueSwatch,
  ValueText,
  EyeDropperTrigger,
  FormatSelect,
  FormatTrigger,
  SwatchGroup,
  Swatch,
  SwatchIndicator,
  SwatchTrigger,
  TransparencyGrid,
  View,
  Context,
};
