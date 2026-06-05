import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@ui/solid";
import { Button } from "@ui/solid";

export default function PopoverBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Popover>
        <PopoverTrigger asChild={(props) => <Button {...props()} />}>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This is a popover description. It can contain any content you want.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  );
}
