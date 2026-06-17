import { Badge } from "@fan-ui/solid";

export default function BadgeBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-wrap items-center gap-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </div>
  );
}
