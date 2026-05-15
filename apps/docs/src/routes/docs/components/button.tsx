import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, Index } from 'solid-js'
import { Button, buttonVariants, Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/solid'

export const Route = createFileRoute('/docs/components/button')({
  component: ButtonDocs,
})

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
const sizes = ['sm', 'md', 'lg', 'icon'] as const

const code = `import { Button } from "~/components/button"

export function ButtonDemo() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`

const recipeCode = `import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-2.5 text-sm',
      md: 'h-9 px-3 py-1.5',
      lg: 'h-10 px-6',
      icon: 'size-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
})`

const componentCode = `import { createMemo, splitProps, type Component, type JSX } from 'solid-js'
import { buttonVariants } from '../recipes/button'
import type { VariantProps } from 'tailwind-variants'

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  const className = createMemo(() =>
    buttonVariants({ variant: local.variant, size: local.size, class: local.class })
  )
  return <button class={className()} {...others} />
}

export { Button, buttonVariants }`

function CodeBlock(props: { code: string }) {
  const [copied, setCopied] = createSignal(false)
  return (
    <div class="relative">
      <pre class="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
        <code>{props.code}</code>
      </pre>
      <button
        class="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-colors"
        onClick={() => {
          navigator.clipboard.writeText(props.code)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        aria-label="Copy code"
      >
        {copied() ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        )}
      </button>
    </div>
  )
}

function ButtonDocs() {
  const [previewTab, setPreviewTab] = createSignal('preview')
  const [installTab, setInstallTab] = createSignal('cli')

  return (
    <div class="space-y-12">
      {/* Hero */}
      <div>
        <h1 class="text-4xl font-bold tracking-tight">Button</h1>
        <p class="mt-2 text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
        <a
          href="https://kobalte.dev/docs/core/components/button"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          Docs
        </a>
      </div>

      {/* Preview / Code tabs */}
      <div>
        <Tabs value={previewTab()} onValueChange={(e) => setPreviewTab(e.value)}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" class="mt-4">
            <div class="rounded-lg border border-border p-6 flex flex-wrap gap-4">
              <Index each={variants}>
                {(variant) => (
                  <Button variant={variant()}>{variant().charAt(0).toUpperCase() + variant().slice(1)}</Button>
                )}
              </Index>
            </div>
          </TabsContent>
          <TabsContent value="code" class="mt-4">
            <CodeBlock code={code} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Installation */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="installation">Installation</h2>
        <Tabs value={installTab()} onValueChange={(e) => setInstallTab(e.value)}>
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" class="mt-4 space-y-4">
            <p class="text-sm text-muted-foreground">
              Run the following command to add the button component to your project:
            </p>
            <CodeBlock code="npx solidui-cli@latest add button" />
          </TabsContent>
          <TabsContent value="manual" class="mt-4 space-y-6">
            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">
                Install the dependency:
              </p>
              <CodeBlock code="npm install tailwind-variants" />
            </div>

            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">
                Create the recipe file at <code class="text-sm bg-muted px-1 py-0.5 rounded">src/components/recipes/button.ts</code>:
              </p>
              <CodeBlock code={recipeCode} />
            </div>

            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">
                Create the component file at <code class="text-sm bg-muted px-1 py-0.5 rounded">src/components/button.tsx</code>:
              </p>
              <CodeBlock code={componentCode} />
            </div>

            <div class="rounded-lg border border-border bg-muted/30 p-4">
              <p class="text-sm text-muted-foreground">
                <strong class="text-foreground font-medium">Note:</strong> Make sure your project has the
                Tailwind CSS theme variables set up (<code class="text-sm bg-muted px-1 py-0.5 rounded">--primary</code>,
                <code class="text-sm bg-muted px-1 py-0.5 rounded">--destructive</code>,
                <code class="text-sm bg-muted px-1 py-0.5 rounded">--ring</code>, etc.)
                or override the utility classes to match your design system.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="usage">Usage</h2>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-muted-foreground mb-3">
              Import the component:
            </p>
            <CodeBlock code={`import { Button } from "~/components/button"`} />
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-3">
              Basic usage with the <code class="text-sm bg-muted px-1 py-0.5 rounded">variant</code> prop:
            </p>
            <CodeBlock code={`<Button variant="outline">Button</Button>`} />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="variants">Variants</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Use the <code class="text-sm bg-muted px-1 py-0.5 rounded">variant</code> prop to change the visual style.
        </p>
        <div class="flex flex-wrap gap-4">
          <Index each={variants}>
            {(variant) => (
              <Button variant={variant()}>{variant().charAt(0).toUpperCase() + variant().slice(1)}</Button>
            )}
          </Index>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="sizes">Sizes</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Use the <code class="text-sm bg-muted px-1 py-0.5 rounded">size</code> prop to change the button size.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <Index each={sizes}>
            {(size) => (
              <Button size={size()}>
                {size() === 'icon' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                ) : (
                  size().charAt(0).toUpperCase() + size().slice(1)
                )}
              </Button>
            )}
          </Index>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="disabled">Disabled</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Add the <code class="text-sm bg-muted px-1 py-0.5 rounded">disabled</code> prop to disable interaction.
        </p>
        <div class="flex flex-wrap gap-4">
          <Index each={variants}>
            {(variant) => (
              <Button variant={variant()} disabled>{variant().charAt(0).toUpperCase() + variant().slice(1)}</Button>
            )}
          </Index>
        </div>
      </div>

      {/* Link */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="link">Link</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Use the <code class="text-sm bg-muted px-1 py-0.5 rounded">buttonVariants</code> helper to render a link that looks like a button.
        </p>
        <CodeBlock code={`import { buttonVariants } from "~/components/button"

<a class={buttonVariants({ variant: "outline" })} href="/docs">
  Click here
</a>`}
        />
      </div>

      {/* API Reference */}
      <div>
        <h2 class="text-2xl font-semibold mb-4" id="api-reference">API Reference</h2>
        <div class="overflow-x-auto rounded-lg border border-border">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/50">
                <th class="text-left px-4 py-3 font-medium">Prop</th>
                <th class="text-left px-4 py-3 font-medium">Type</th>
                <th class="text-left px-4 py-3 font-medium">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-border">
                <td class="px-4 py-3 font-mono text-xs">variant</td>
                <td class="px-4 py-3 font-mono text-xs">"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</td>
                <td class="px-4 py-3 font-mono text-xs">"default"</td>
              </tr>
              <tr class="border-b border-border">
                <td class="px-4 py-3 font-mono text-xs">size</td>
                <td class="px-4 py-3 font-mono text-xs">"sm" | "md" | "lg" | "icon"</td>
                <td class="px-4 py-3 font-mono text-xs">"sm"</td>
              </tr>
              <tr class="border-b border-border">
                <td class="px-4 py-3 font-mono text-xs">disabled</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3 font-mono text-xs">false</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-xs">class</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3 font-mono text-xs">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
