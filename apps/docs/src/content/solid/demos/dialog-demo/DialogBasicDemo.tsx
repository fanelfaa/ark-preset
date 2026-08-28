import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCloseTrigger,
  Button,
} from "@ark-preset/solid";

export default function DialogBasicDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>About Ark UI</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Ark UI</DialogTitle>
          <DialogDescription>
            Ark UI is a headless, accessible component library that works with Solid, Vue, and
            React.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseTrigger variant="outline">Close</DialogCloseTrigger>
          <Button>Learn More</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
