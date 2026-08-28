import { Input } from "@ark-preset/solid";

export default function InputDescriptionDemo() {
  return (
    <Input
      label="Email"
      description="We'll never share your email."
      placeholder="email@example.com"
    />
  );
}
