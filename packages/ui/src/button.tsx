import { splitProps, type Component, type JSX } from 'solid-js'
import { tv, type VariantProps } from './tv'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      default: 'bg-ui-primary text-ui-primary-foreground hover:bg-ui-primary/90',
      destructive: 'bg-ui-destructive text-ui-destructive-foreground hover:bg-ui-destructive/90',
      outline: 'border border-ui-input bg-ui-background hover:bg-ui-accent hover:text-ui-accent-foreground',
      secondary: 'bg-ui-secondary text-ui-secondary-foreground hover:bg-ui-secondary/80',
      ghost: 'hover:bg-ui-accent hover:text-ui-accent-foreground',
      link: 'text-ui-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-9 rounded-md px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8',
      icon: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <button
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  )
}

export { Button, buttonVariants }