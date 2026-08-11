import { usePasswordInput } from "@ark-ui/solid/password-input";
import { Button, PasswordInputRootProvider } from "@ark-preset/solid";

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();

  return (
    <div class="space-y-4">
      <Button
        onClick={() => {
          passwordInput().toggleVisible();
        }}
      >
        Toggle
      </Button>

      <PasswordInputRootProvider value={passwordInput} />
    </div>
  );
}
