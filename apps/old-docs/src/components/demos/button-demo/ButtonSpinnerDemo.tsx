import { Button, Spinner } from "@ark-preset/solid";

export default function ButtonSpinnerDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button disabled variant="outline" size="icon">
        <Spinner />
      </Button>
      <Button disabled variant="outline">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button disabled variant="outline">
        Saving
        <Spinner data-icon="inline-end" />
      </Button>
    </div>
  );
}
