import { createSignal } from "solid-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Button,
  PasswordInput,
  Spinner,
  TextSmall,
} from "@ark-preset/solid";

export default function AuthBlockModal() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [open, setOpen] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (!email() || !password()) {
      setError("Both fields are required.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    if (password().length < 6) {
      setError("Password must be at least 6 characters.");
    } else {
      alert("Successfully created account!");
      setOpen(false); // Close modal on success
    }
  };

  return (
    <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
      <DialogTrigger variant="outline" data-testid="auth-modal-trigger">
        Create Account
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Create a new account to get started with our platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} data-testid="auth-modal-form">
          <div class="grid gap-4 py-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              error={error() && !email() ? "Email required" : undefined}
              data-testid="auth-modal-email"
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password()}
              onInput={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
              error={error() && !password() ? true : undefined}
              data-testid="auth-modal-password"
            />
            {error() && <TextSmall class="text-red-500 font-medium">{error()}</TextSmall>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="auth-modal-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading()} data-testid="auth-modal-submit">
              {isLoading() && <Spinner data-icon="inline-start" />}
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
