import { ScrollArea } from "@ark-preset/solid";
import { For } from "solid-js";

export default function ScrollAreaHorizontalDemo() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <ScrollArea class="w-96 whitespace-nowrap rounded-md border" orientation="horizontal">
      <div class="flex w-max space-x-4 p-4">
        <For each={items}>
          {(item) => (
            <div class="flex h-20 w-24 shrink-0 items-center justify-center rounded-md border bg-muted text-sm font-medium">
              {item}
            </div>
          )}
        </For>
      </div>
    </ScrollArea>
  );
}
