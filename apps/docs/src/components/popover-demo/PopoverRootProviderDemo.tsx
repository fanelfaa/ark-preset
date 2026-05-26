import { usePopover } from "@ark-ui/solid/popover";
import {
  PopoverRootProvider,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseTrigger,
} from "@ui/solid";
import { Button } from "@ui/solid";

export default function PopoverRootProviderDemo() {
  const popover = usePopover();

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(popover().open)}
      </output>

      <PopoverRootProvider value={popover}>
        <PopoverTrigger asChild={(props) => <Button {...props()} />}>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This popover state is managed externally via <code>usePopover</code>.
          </PopoverDescription>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverContent>
      </PopoverRootProvider>
    </div>
  );
}
