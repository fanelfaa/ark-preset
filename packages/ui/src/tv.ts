import { createTV } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const tv = createTV({
  twMerge: true,
  twMergeConfig: {
    theme: {},
    classGroups: {},
  },
})

export { tv, type VariantProps }