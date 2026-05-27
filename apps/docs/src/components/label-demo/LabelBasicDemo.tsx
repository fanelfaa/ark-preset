import { Label } from "@ui/solid";
import { Input } from "@ui/solid";

export default function LabelBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="label-name">Name</Label>
          <Input id="label-name" placeholder="Enter your name" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="label-email">Email</Label>
          <Input id="label-email" type="email" placeholder="Enter your email" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="label-error" error>Invalid input</Label>
          <Input id="label-error" error placeholder="This field has an error" />
        </div>
      </div>
    </div>
  );
}
