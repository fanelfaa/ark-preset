import { Field } from '@ark-ui/solid/field'
import { splitProps, type Component, type JSX } from 'solid-js'
import { tv, type VariantProps } from './tv'

const inputVariants = tv({
  slots: {
    root: 'grid gap-1.5',
    label: 'text-sm font-medium text-ui-foreground',
    input:
      'flex h-10 w-full rounded-md border border-ui-input bg-ui-background px-3 py-2 text-sm ring-offset-ui-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ui-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    description: 'text-sm text-ui-muted-foreground',
    error: 'text-sm text-ui-destructive',
  },
  variants: {
    error: {
      true: {
        input: 'border-ui-destructive focus-visible:ring-ui-destructive',
      },
    },
  },
  defaultVariants: {
    error: false,
  },
})

type InputProps = {
  label?: string
  description?: string
  error?: string
  class?: string
} & JSX.IntrinsicElements['input']

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ['label', 'description', 'error', 'class'])
  const styles = inputVariants({ error: !!local.error })
  return (
    <Field.Root class={styles.root({ class: local.class })} invalid={!!local.error}>
      {local.label && <Field.Label class={styles.label()}>{local.label}</Field.Label>}
      <Field.Input class={styles.input()} {...others} />
      {local.description && !local.error && (
        <Field.HelperText class={styles.description()}>{local.description}</Field.HelperText>
      )}
      <Field.ErrorText class={styles.error()}>{local.error}</Field.ErrorText>
    </Field.Root>
  )
}

export { Input, inputVariants }