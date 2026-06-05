import { useSlider } from "@ark-ui/solid/slider";
import {
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
} from "@ui/solid";

export default function SliderRootProviderDemo() {
  const slider = useSlider({ defaultValue: [50], min: 0, max: 100 });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(slider().value)}
      </output>

      <SliderRootProvider value={slider}>
        <div class="flex items-center justify-between gap-4">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderThumb index={0} />
        </SliderControl>
      </SliderRootProvider>
    </div>
  );
}
