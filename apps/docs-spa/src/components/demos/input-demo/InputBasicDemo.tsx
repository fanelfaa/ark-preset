import { Input } from "@fan-ui/solid";

export default function InputBasicDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Input placeholder="Basic input" />
      <Input label="Email" placeholder="Enter your email" />
      <Input
        label="With Description"
        description="We'll never share your email."
        placeholder="email@example.com"
      />
      <Input label="Error State" error="This field is required" placeholder="Enter value" />
    </div>
  );
}
