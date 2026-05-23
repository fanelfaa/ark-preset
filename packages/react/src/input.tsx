import { forwardRef, type InputHTMLAttributes } from "react";
import { Field } from "@ark-ui/react/field";
import { inputVariants } from "@ui/core/recipes/input";

type InputProps = {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, className, ...props }, ref) => {
    const styles = inputVariants({ error: !!error });
    return (
      <Field.Root className={styles.root({ class: className })} invalid={!!error}>
        {label && <Field.Label className={styles.label()}>{label}</Field.Label>}
        <Field.Input className={styles.input()} ref={ref} {...props} />
        {description && !error && (
          <Field.HelperText className={styles.description()}>{description}</Field.HelperText>
        )}
        <Field.ErrorText className={styles.error()}>{error}</Field.ErrorText>
      </Field.Root>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
export type { InputProps };
