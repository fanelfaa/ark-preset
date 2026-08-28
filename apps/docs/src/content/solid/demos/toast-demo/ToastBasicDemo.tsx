import { Button, createToaster, Toaster } from "@ark-preset/solid";

const toaster = createToaster({
  placement: "bottom-end",
});

export default function ToastBasicDemo() {
  return (
    <div>
      <Button onClick={() => toaster.create({ title: "Hello", description: "World" })}>
        Show Toast
      </Button>
      <Toaster toaster={toaster} />
    </div>
  );
}
