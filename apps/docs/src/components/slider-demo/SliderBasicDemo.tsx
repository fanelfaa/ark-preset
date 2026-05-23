import {
  SliderRoot,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@ui/solid";

export default function SliderBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <SliderRoot defaultValue={[50]} min={0} max={100}>
        <div class="flex items-center justify-between gap-4">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} />
        </SliderControl>
      </SliderRoot>
    </div>
  );
}
