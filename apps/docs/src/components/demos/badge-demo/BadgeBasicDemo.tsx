import { Badge } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function BadgeBasicDemo() {
  return (
    <DemoWrapper>
      <div class="flex flex-wrap items-center gap-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </DemoWrapper>
  );
}
