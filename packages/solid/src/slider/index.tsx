import { splitProps, type Component } from "solid-js";
import { Slider as SliderBase } from "./slider.base";
import { Slider as ArkSlider } from "@ark-ui/solid/slider";

// Root aliases (backward compat)
const Slider = SliderBase.Root;
const SliderRootProvider = SliderBase.RootProvider;
const SliderLabel = SliderBase.Label;
const SliderValueText = SliderBase.ValueText;

// Composite wrappers — auto-include sub-parts
const SliderControl: Component<ArkSlider.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <SliderBase.Control {...others}>
      <SliderBase.Track>
        <SliderBase.Range />
      </SliderBase.Track>
      {local.children}
    </SliderBase.Control>
  );
};

const SliderThumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["children", "index"]);
  return (
    <SliderBase.Thumb index={local.index} {...others}>
      {local.children}
      <SliderBase.HiddenInput />
    </SliderBase.Thumb>
  );
};

// Raw parts exported for advanced use
const SliderMarker = SliderBase.Marker;
const SliderMarkerGroup = SliderBase.MarkerGroup;
const SliderDraggingIndicator = SliderBase.DraggingIndicator;

export {
  Slider,
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
  SliderMarker,
  SliderMarkerGroup,
  SliderDraggingIndicator,
  SliderBase,
};

export { sliderVariants, type SliderVariants } from "@ark-preset/core";
