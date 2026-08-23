import { PasswordInput } from "@ark-preset/solid";

export default function PasswordInputBasicDemo() {
  return (
    <div class="flex flex-col gap-4">
      <PasswordInput />
      <PasswordInput label="Password" />
      <PasswordInput label="Password" placeholder="Enter your password" />
    </div>
  );
}
