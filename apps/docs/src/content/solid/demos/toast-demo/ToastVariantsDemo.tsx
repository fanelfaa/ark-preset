import { Button, createToaster, Toaster } from "@ark-preset/solid";

const toaster = createToaster({
  placement: "bottom",
});

export default function ToastVariantsDemo() {
  return (
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
            title: "Info toast",
            description: "This is an info message",
            type: "info",
          })
        }
      >
        Info
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
        variant="outline"
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
      <Toaster toaster={toaster} />
    </div>
  );
}
