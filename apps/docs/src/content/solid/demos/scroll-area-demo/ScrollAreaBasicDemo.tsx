import { ScrollArea } from "@ark-preset/solid";

export default function ScrollAreaBasicDemo() {
  return (
    <ScrollArea class="h-[200px] w-[350px]" orientation="vertical">
      <div class="p-4">
        <p>Long content here...</p>
      </div>
    </ScrollArea>
  );
}
