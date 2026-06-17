import { usePasswordInput } from "@ark-ui/solid/password-input";
import { Button, PasswordInputRootProvider } from "@fan-ui/solid";

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
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
