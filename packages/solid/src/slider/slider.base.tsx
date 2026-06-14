import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { splitProps, type Component } from "solid-js";
import { sliderVariants } from "@fan-ui/core";

const styles = sliderVariants();

const Root: Component<ArkSlider.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkSlider.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkSlider.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Label class={styles.label({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkSlider.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const Control: Component<ArkSlider.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Control class={styles.control({ class: local.class })} {...others} />;
};

const Track: Component<ArkSlider.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Track class={styles.track({ class: local.class })} {...others} />;
};

const Range: Component<ArkSlider.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Range class={styles.range({ class: local.class })} {...others} />;
};

const Thumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"]);
  return (
    <ArkSlider.Thumb class={styles.thumb({ class: local.class })} index={local.index} {...others} />
  );
};

const HiddenInput: Component<ArkSlider.HiddenInputProps> = (props) => {
  return <ArkSlider.HiddenInput {...props} />;
};

const DraggingIndicator: Component<ArkSlider.DraggingIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSlider.DraggingIndicator
      class={styles.draggingIndicator({ class: local.class })}
      {...others}
    />
  );
};

const MarkerGroup: Component<ArkSlider.MarkerGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.MarkerGroup class={styles.markerGroup({ class: local.class })} {...others} />;
};

const Marker: Component<ArkSlider.MarkerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "value"]);
  return (
    <ArkSlider.Marker
      class={styles.marker({ class: local.class })}
      value={local.value}
      {...others}
    />
  );
};

export const Slider = {
  Root,
  RootProvider,
  Label,
  ValueText,
  Control,
  Track,
  Range,
  Thumb,
  HiddenInput,
  DraggingIndicator,
  MarkerGroup,
  Marker,
};
