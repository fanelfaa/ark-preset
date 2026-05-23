import { PasswordInput } from "@ui/solid";

export default function PasswordInputBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex flex-col gap-4">
        <PasswordInput />
        <PasswordInput label="Password" />
        <PasswordInput label="Password" placeholder="Enter your password" />
      </div>
    </div>
  );
}
