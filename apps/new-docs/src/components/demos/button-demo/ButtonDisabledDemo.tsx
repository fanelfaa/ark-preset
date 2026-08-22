import { Button } from "@ark-preset/solid";

export default function ButtonDisabledDemo() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
    </div>
  );
}
