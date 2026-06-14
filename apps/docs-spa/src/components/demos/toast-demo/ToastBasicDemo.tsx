import { Button, createToaster, Toaster } from "@fan-ui/solid";

const toaster = createToaster({
  placement: "bottom-end",
  duration: 500000,
});

export default function ToastBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toaster.create({ title: "Default toast", description: "This is a default message" })
            }
          >
            Default
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toaster.create({
                title: "Success toast",
                description: "Operation completed!",
                type: "success",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              toaster.create({
                title: "Warning toast",
                description: "Please check this",
                type: "warning",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toaster.create({
                title: "Error toast",
                description: "Something went wrong",
                type: "error",
              })
            }
          >
            Error
          </Button>
        </div>
        <Toaster toaster={toaster} />
      </div>
    </div>
  );
}
