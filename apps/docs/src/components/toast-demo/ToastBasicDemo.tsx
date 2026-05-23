import { createToaster, Toaster } from "@ui/solid";

const toaster = createToaster({
  placement: "bottom-end",
  timeout: 5000,
});

export default function ToastBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <button
            class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
            onClick={() =>
              toaster.create({ title: "Default toast", description: "This is a default message" })
            }
          >
            Default
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md"
            onClick={() =>
              toaster.create({
                title: "Info toast",
                description: "This is an info message",
                type: "info",
              })
            }
          >
            Info
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md"
            onClick={() =>
              toaster.create({
                title: "Success toast",
                description: "Operation completed!",
                type: "success",
              })
            }
          >
            Success
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md"
            onClick={() =>
              toaster.create({
                title: "Warning toast",
                description: "Please check this",
                type: "warning",
              })
            }
          >
            Warning
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md"
            onClick={() =>
              toaster.create({
                title: "Error toast",
                description: "Something went wrong",
                type: "error",
              })
            }
          >
            Error
          </button>
        </div>
        <Toaster toaster={toaster} />
      </div>
    </div>
  );
}
