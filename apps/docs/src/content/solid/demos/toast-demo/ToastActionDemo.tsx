import { Button, createToaster, Toaster } from "@ark-preset/solid";

const toaster = createToaster({
  placement: "top-end",
});

export default function ToastActionDemo() {
  return (
    <div>
      <Button
        onClick={() =>
          toaster.create({
            title: "File deleted",
            description: "Your file has been removed.",
            action: { label: "Undo", onClick: () => console.log("undo") },
          })
        }
      >
        Delete File
      </Button>
      <Toaster toaster={toaster} />
    </div>
  );
}
