import { ToggleGroup, ToggleGroupItem } from "@ark-preset/solid";

export default function ToggleGroupSizesDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-6">
        <ToggleGroup defaultValue={["sm"]}>
          <ToggleGroupItem size="sm" value="sm">
            Sm
          </ToggleGroupItem>
          <ToggleGroupItem size="sm" value="md">
            Sm
          </ToggleGroupItem>
          <ToggleGroupItem size="sm" value="lg">
            Sm
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={["md"]}>
          <ToggleGroupItem size="md" value="sm">
            Md
          </ToggleGroupItem>
          <ToggleGroupItem size="md" value="md">
            Md
          </ToggleGroupItem>
          <ToggleGroupItem size="md" value="lg">
            Md
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={["lg"]}>
          <ToggleGroupItem size="lg" value="sm">
            Lg
          </ToggleGroupItem>
          <ToggleGroupItem size="lg" value="md">
            Lg
          </ToggleGroupItem>
          <ToggleGroupItem size="lg" value="lg">
            Lg
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
