import { DemoWrapper } from "../../DemoWrapper";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@ark-preset/solid";

export default function PopoverBasicDemo() {
  return (
    <DemoWrapper>
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This is a popover description. It can contain any content you want.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </DemoWrapper>
  );
}
