import { DemoWrapper } from "../../DemoWrapper";
import { TagsInput } from "@ark-preset/solid";

export default function TagsInputBasicDemo() {
  return (
    <DemoWrapper class="space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Basic tags input</p>
        <TagsInput defaultValue={["React", "Solid"]} label="Frameworks" />
      </div>
    </DemoWrapper>
  );
}
