import { Component, createSignal } from 'solid-js'
import { Button } from '@ui/solid'
import { Input } from '@ui/solid'
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@ui/solid'
import {
  SelectRoot,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValue,
  SelectContent,
  createListCollection,
} from '@ui/solid'
import { createToaster, Toaster } from '@ui/solid'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
  ],
})

const App: Component = () => {
  const [dialogOpen, setDialogOpen] = createSignal(false)
  const [selectedValue, setSelectedValue] = createSignal<string[]>([])
  const toaster = createToaster({ placement: 'bottom-end' })

  return (
    <div class="min-h-screen bg-ui-background text-ui-foreground">
      {/* Header */}
      <header class="border-b border-ui-border bg-ui-background">
        <div class="mx-auto max-w-5xl px-6 py-8">
          <h1 class="text-3xl font-bold">Solid UI</h1>
          <p class="mt-1.5 text-ui-muted-foreground">
            Component demos for <code class="text-sm bg-ui-muted px-1.5 py-0.5 rounded">@ui/solid</code>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main class="mx-auto max-w-5xl px-6 py-12 space-y-24">

        {/* ════════════════════ Button ════════════════════ */}
        <section id="button">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Button</h2>
            <p class="mt-1 text-ui-muted-foreground">
              All 6 variants across sizes, plus disabled state.
            </p>
          </div>

          <div class="space-y-10">
            {/* Variants */}
            <div>
              <h3 class="text-xs font-medium text-ui-muted-foreground mb-3 uppercase tracking-widest">
                Variants
              </h3>
              <div class="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 class="text-xs font-medium text-ui-muted-foreground mb-3 uppercase tracking-widest">
                Sizes (sm, md, lg, icon)
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Add">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 class="text-xs font-medium text-ui-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <div class="flex flex-wrap gap-3">
                <Button disabled variant="default">Default</Button>
                <Button disabled variant="destructive">Destructive</Button>
                <Button disabled variant="outline">Outline</Button>
                <Button disabled variant="secondary">Secondary</Button>
                <Button disabled variant="ghost">Ghost</Button>
                <Button disabled variant="link">Link</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ Input ════════════════════ */}
        <section id="input">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Input</h2>
            <p class="mt-1 text-ui-muted-foreground">
              Form field with label, description, and error state.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <Input placeholder="Basic input" />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              description="We'll never share your email."
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error="Password must be at least 8 characters."
            />
            <Input label="Full Name" placeholder="John Doe" disabled />
          </div>
        </section>

        {/* ════════════════════ Dialog ════════════════════ */}
        <section id="dialog">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Dialog</h2>
            <p class="mt-1 text-ui-muted-foreground">
              Modal dialog with backdrop, header, body, and footer.
            </p>
          </div>

          <DialogRoot
            open={dialogOpen()}
            onOpenChange={({ open }) => setDialogOpen(open)}
          >
            <DialogTrigger>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div class="py-4 text-sm text-ui-foreground">
                <p>
                  This is the dialog body. You can place any content here —
                  form fields, additional info, or custom layouts.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </section>

        {/* ════════════════════ Select ════════════════════ */}
        <section id="select">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Select</h2>
            <p class="mt-1 text-ui-muted-foreground">
              Dropdown select with collection API — pick a framework.
            </p>
          </div>

          <div class="max-w-xs">
            <SelectRoot
              collection={frameworks}
              value={selectedValue()}
              onValueChange={(details) => setSelectedValue(details.value)}
            >
              <SelectLabel>Framework</SelectLabel>
              <SelectControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a framework" />
                </SelectTrigger>
              </SelectControl>
              <SelectContent items={frameworks.items} />
            </SelectRoot>
            {selectedValue().length > 0 && (
              <p class="mt-2 text-xs text-ui-muted-foreground">
                Selected: <span class="font-medium text-ui-foreground">{selectedValue()[0]}</span>
              </p>
            )}
          </div>
        </section>

        {/* ════════════════════ Toast ════════════════════ */}
        <section id="toast">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Toast</h2>
            <p class="mt-1 text-ui-muted-foreground">
              Click a button to trigger a notification.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <Button
              onClick={() =>
                toaster.create({
                  title: 'Notification',
                  description: 'This is a default toast.',
                })
              }
            >
              Default
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toaster.create({
                  title: 'Error',
                  description: 'Something went wrong!',
                  type: 'destructive',
                })
              }
            >
              Destructive
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toaster.create({
                  title: 'Success',
                  description: 'Operation completed successfully.',
                  type: 'success',
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toaster.create({
                  title: 'Warning',
                  description: 'Please check your input.',
                  type: 'warning',
                })
              }
            >
              Warning
            </Button>
          </div>
          <Toaster toaster={toaster} />
        </section>

      </main>
    </div>
  )
}

export default App
