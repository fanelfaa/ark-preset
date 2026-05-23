import {
  SelectRoot,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValue,
  SelectContent,
  createListCollection,
} from "@ui/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function SelectBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <SelectRoot collection={frameworks}>
        <SelectLabel>Framework</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
        </SelectControl>
        <SelectContent items={frameworks.items} />
      </SelectRoot>
    </div>
  );
}
