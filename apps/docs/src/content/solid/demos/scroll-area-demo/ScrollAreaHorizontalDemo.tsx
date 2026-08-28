import { ScrollArea } from "@ark-preset/solid";

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea class="w-[350px]" orientation="horizontal">
      <div class="flex w-[800px] p-4">
        <p>Wide content here...</p>
      </div>
    </ScrollArea>
  );
}
