import { ScrollArea } from "@ark-preset/solid";
import { For } from "solid-js";

export default function ScrollAreaBasicDemo() {
  const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);

  return (
    <ScrollArea class="h-[200px] w-[350px] rounded-md border" orientation="vertical">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <For each={tags}>
          {(tag) => (
            <>
              <div class="text-sm">{tag}</div>
              <div class="my-2 h-px bg-border" />
            </>
          )}
        </For>
      </div>
    </ScrollArea>
  );
}
