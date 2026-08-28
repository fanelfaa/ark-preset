import { Slider, SliderLabel, SliderControl, SliderThumb } from "@ark-preset/solid";

export default function SliderDisabledDemo() {
  return (
    <Slider defaultValue={[50]} disabled>
      <SliderLabel>Disabled Slider</SliderLabel>
      <SliderControl>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  );
}
