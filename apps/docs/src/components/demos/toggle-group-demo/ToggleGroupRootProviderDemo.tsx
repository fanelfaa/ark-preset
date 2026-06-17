import { Index, createMemo } from "solid-js";
import { ToggleGroupBase, ToggleGroupItem } from "@ark-preset/solid";
import { useToggleGroup } from "@ark-ui/solid/toggle-group";

const alignments = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export default function ToggleGroupRootProviderDemo() {
  const toggleGroup = useToggleGroup({ defaultValue: ["left"] });
  const value = createMemo(() => toggleGroup().value);

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <p class="text-sm text-muted-foreground">Selected: {value().join(", ")}</p>
      <ToggleGroupBase.RootProvider value={toggleGroup}>
        <Index each={alignments}>
          {(alignment) => (
            <ToggleGroupItem value={alignment().value}>{alignment().label}</ToggleGroupItem>
          )}
        </Index>
      </ToggleGroupBase.RootProvider>
    </div>
  );
}
