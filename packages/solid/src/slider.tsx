import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { sliderVariants } from "@ui/core";

const styles = sliderVariants();

const SliderRoot: Component<ArkSlider.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkSlider.Root class={rootClass()} {...others} />;
};

const SliderRootProvider: Component<ArkSlider.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkSlider.RootProvider class={rootClass()} {...others} />;
};

const SliderLabel: Component<ArkSlider.LabelProps> = (props) => {
  const labelClass = createMemo(() => styles.label({ class: props.class }));
  return <ArkSlider.Label class={labelClass()} {...props} />;
};

const SliderValueText: Component<ArkSlider.ValueTextProps> = (props) => {
  const valueTextClass = createMemo(() => styles.valueText({ class: props.class }));
  return <ArkSlider.ValueText class={valueTextClass()} {...props} />;
};

type ControlProps = ArkSlider.ControlProps & { class?: string; children?: JSX.Element };

const SliderControl: Component<ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const controlClass = createMemo(() => styles.control({ class: local.class }));
  return (
    <ArkSlider.Control class={controlClass()} {...others}>
      {local.children}
    </ArkSlider.Control>
  );
};

type TrackProps = ArkSlider.TrackProps & { class?: string; children?: JSX.Element };

const SliderTrack: Component<TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const trackClass = createMemo(() => styles.track({ class: local.class }));
  return (
    <ArkSlider.Track class={trackClass()} {...others}>
      {local.children}
    </ArkSlider.Track>
  );
};

const SliderRange: Component<ArkSlider.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rangeClass = createMemo(() => styles.range({ class: local.class }));
  return <ArkSlider.Range class={rangeClass()} {...others} />;
};

const SliderThumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"]);
  const thumbClass = createMemo(() => styles.thumb({ class: local.class }));
  return <ArkSlider.Thumb class={thumbClass()} index={local.index} {...others} />;
};

const SliderHiddenInput: Component<ArkSlider.HiddenInputProps> = (props) => {
  return <ArkSlider.HiddenInput {...props} />;
};

const SliderDraggingIndicator: Component<ArkSlider.DraggingIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const draggingIndicatorClass = createMemo(() => styles.draggingIndicator({ class: local.class }));
  return <ArkSlider.DraggingIndicator class={draggingIndicatorClass()} {...others} />;
};

const SliderMarkerGroup: Component<ArkSlider.MarkerGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const markerGroupClass = createMemo(() => styles.markerGroup({ class: local.class }));
  return <ArkSlider.MarkerGroup class={markerGroupClass()} {...others} />;
};

const SliderMarker: Component<ArkSlider.MarkerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "value"]);
  const markerClass = createMemo(() => styles.marker({ class: local.class }));
  return <ArkSlider.Marker class={markerClass()} value={local.value} {...others} />;
};

export {
  SliderRoot,
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderTrack,
  SliderRange,
  SliderThumb,
  SliderHiddenInput,
  SliderDraggingIndicator,
  SliderMarkerGroup,
  SliderMarker,
  sliderVariants,
};
