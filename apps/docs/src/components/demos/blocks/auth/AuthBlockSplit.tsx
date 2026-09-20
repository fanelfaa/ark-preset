import { createSignal } from "solid-js";
import {
  Input,
  Button,
  PasswordInput,
  Checkbox,
  Spinner,
  Heading,
  TextMuted,
  TextSmall,
} from "@ark-preset/solid";

export const AuthBlockSplit = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (!email() || !password()) {
      setError("Please provide all required information.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Welcome back!");
  };

  return (
    <div class="w-full flex min-h-[600px] border rounded-xl overflow-hidden bg-background shadow-sm">
      {/* Left Side - Branding / Image */}
      <div class="hidden md:flex w-1/2 bg-muted items-center justify-center relative">
        <div class="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-900/50" />
        <div class="relative z-10 p-10 text-center">
          <Heading level={2} class="mb-2">
            Ark Preset
          </Heading>
          <TextMuted class="max-w-sm">
            Beautifully designed components built with Solid.js and Ark UI. Accessible,
            customizable, and ready to use.
          </TextMuted>
        </div>
      </div>

      {/* Right Side - Form */}
      <div class="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div class="w-full max-w-sm space-y-6">
          <div class="space-y-2 text-center md:text-left">
            <Heading level={3}>Welcome back</Heading>
            <TextMuted>Enter your email to sign in to your account</TextMuted>
          </div>

          <form onSubmit={handleSubmit} class="space-y-4" data-testid="auth-split-form">
            <Input
              label="Email"
              type="email"
              placeholder="m@example.com"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              data-testid="auth-split-email"
            />
            <PasswordInput
              label="Password"
              placeholder="........"
              value={password()}
              onInput={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
              required
              error={error() && !password() ? true : undefined}
              data-testid="auth-split-password"
            />
            <div class="flex items-center justify-between text-sm">
              <Checkbox>Remember me</Checkbox>
              <a href="#" class="font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {error() && <TextSmall class="text-red-500 font-medium">{error()}</TextSmall>}

            <Button
              type="submit"
              class="w-full"
              disabled={isLoading()}
              data-testid="auth-split-submit"
            >
              {isLoading() && <Spinner data-icon="inline-start" />}
              Sign In
            </Button>
          </form>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" class="w-full" type="button" data-testid="auth-split-github">
            <svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </Button>

          <TextMuted class="text-center">
            Don't have an account?{" "}
            <a href="#" class="font-medium text-primary hover:underline">
              Sign up
            </a>
          </TextMuted>
        </div>
      </div>
    </div>
  );
};
