import { DemoWrapper } from "../../DemoWrapper";
import { PasswordInput } from "@ark-preset/solid";

export default function PasswordInputBasicDemo() {
  return (
    <DemoWrapper>
      <div class="flex flex-col gap-4">
        <PasswordInput />
        <PasswordInput label="Password" />
        <PasswordInput label="Password" placeholder="Enter your password" />
      </div>
    </DemoWrapper>
  );
}
