import { createFileRoute, Link } from "@tanstack/solid-router";
import { buttonVariants } from "@ui/core";

export const Route = createFileRoute("/$")({ component: NotFound });

function NotFound() {
  return (
    <div class="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div class="mb-6 text-8xl font-bold text-muted-foreground/20">404</div>
      <h1 class="mb-2 text-2xl font-semibold">Page not found</h1>
      <p class="mb-8 text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved. Check the
        URL or browse our component library.
      </p>
      <div class="flex gap-4">
        <Link to="/" class={buttonVariants({ variant: "default" })}>
          Go Home
        </Link>
        <Link to="/components/button" class={buttonVariants({ variant: "outline" })}>
          Browse Components
        </Link>
      </div>
    </div>
  );
}
