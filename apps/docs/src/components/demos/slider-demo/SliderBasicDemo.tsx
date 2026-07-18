import { DemoWrapper } from "../../DemoWrapper";
import {
  Slider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
} from "@ark-preset/solid";

export default function SliderBasicDemo() {
  return (
    <DemoWrapper>
      <Slider defaultValue={[50]} min={0} max={100}>
        <div class="flex items-center justify-between gap-4">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderThumb index={0} />
        </SliderControl>
      </Slider>
    </DemoWrapper>
  );
}
