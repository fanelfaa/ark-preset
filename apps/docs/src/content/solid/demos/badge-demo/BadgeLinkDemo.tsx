import { Badge } from "@ark-preset/solid";

export default function BadgeLinkDemo() {
  return (
    <Badge asChild={(props) => <a {...props()} />} variant="link">
      Anchor Badge
    </Badge>
  );
}
