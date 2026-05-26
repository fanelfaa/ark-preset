import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { splitProps, type Component } from "solid-js";
import { sliderVariants } from "@ui/core";

const styles = sliderVariants();

export const SliderRoot: Component<ArkSlider.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Root class={styles.root({ class: local.class })} {...others} />;
};

export const SliderRootProvider: Component<ArkSlider.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const SliderLabel: Component<ArkSlider.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Label class={styles.label({ class: local.class })} {...others} />;
};

export const SliderValueText: Component<ArkSlider.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

export const SliderControl: Component<ArkSlider.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Control class={styles.control({ class: local.class })} {...others} />;
};

export const SliderTrack: Component<ArkSlider.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Track class={styles.track({ class: local.class })} {...others} />;
};

export const SliderRange: Component<ArkSlider.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Range class={styles.range({ class: local.class })} {...others} />;
};

export const SliderThumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"]);
  return (
    <ArkSlider.Thumb class={styles.thumb({ class: local.class })} index={local.index} {...others} />
  );
};

export const SliderHiddenInput: Component<ArkSlider.HiddenInputProps> = (props) => {
  return <ArkSlider.HiddenInput {...props} />;
};

export const SliderDraggingIndicator: Component<ArkSlider.DraggingIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSlider.DraggingIndicator
      class={styles.draggingIndicator({ class: local.class })}
      {...others}
    />
  );
};

export const SliderMarkerGroup: Component<ArkSlider.MarkerGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.MarkerGroup class={styles.markerGroup({ class: local.class })} {...others} />;
};

export const SliderMarker: Component<ArkSlider.MarkerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "value"]);
  return (
    <ArkSlider.Marker
      class={styles.marker({ class: local.class })}
      value={local.value}
      {...others}
    />
  );
};
