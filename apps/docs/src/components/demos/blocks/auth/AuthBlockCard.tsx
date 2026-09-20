import { createSignal } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Button,
  PasswordInput,
  Spinner,
  TextSmall,
  TextMuted,
} from "@ark-preset/solid";

export const AuthBlockCard = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (!email() || !password()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    if (email() !== "admin@example.com") {
      setError("Invalid credentials. Try admin@example.com");
    } else {
      alert("Successfully logged in!");
    }
  };

  return (
    <Card class="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} data-testid="auth-card-form">
        <CardContent class="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            error={error() && !email() ? "Email required" : undefined}
            data-testid="auth-card-email"
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password()}
            onInput={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
            error={error() && !password() ? true : undefined}
            data-testid="auth-card-password"
          />
          {error() && <TextSmall class="text-red-500 font-medium">{error()}</TextSmall>}
        </CardContent>
        <CardFooter class="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            class="w-full"
            disabled={isLoading()}
            data-testid="auth-card-submit"
          >
            {isLoading() && <Spinner data-icon="inline-start" />}
            Sign In
          </Button>
          <TextMuted class="text-center">
            Don't have an account?{" "}
            <a href="#" class="underline hover:text-primary">
              Sign up
            </a>
          </TextMuted>
        </CardFooter>
      </form>
    </Card>
  );
};
