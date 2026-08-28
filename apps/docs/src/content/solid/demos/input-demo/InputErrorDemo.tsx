import { Input } from "@ark-preset/solid";

export default function InputErrorDemo() {
  return <Input label="Email" error="Invalid email address" type="email" />;
}
