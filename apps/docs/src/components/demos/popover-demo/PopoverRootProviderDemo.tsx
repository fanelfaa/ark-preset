import { DemoWrapper } from "../../DemoWrapper";
import { usePopover } from "@ark-ui/solid/popover";
import {
  PopoverContent,
  PopoverTrigger,
  PopoverTitle,
  PopoverDescription,
  PopoverBase,
} from "@ark-preset/solid";
export default function PopoverRootProviderDemo() {
  const popover = usePopover();

  return (
    <DemoWrapper class="space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(popover().open)}
      </output>

      <PopoverBase.RootProvider value={popover}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This popover state is managed externally via <code>usePopover</code>.
          </PopoverDescription>
        </PopoverContent>
      </PopoverBase.RootProvider>
    </DemoWrapper>
  );
}
