import { Select, createListCollection } from "@ark-ui/react/select";
import { forwardRef, type ComponentRef } from "react";
import { selectVariants } from "@ui/core/recipes/select";

export { createListCollection };

export const SelectRoot = Select.Root;
export const SelectLabel = Select.Label;
export const SelectControl = forwardRef<
  ComponentRef<typeof Select.Control>,
  Select.ControlProps & { className?: string }
>(({ className, children, ...props }, ref) => {
  const styles = selectVariants();
  return (
    <Select.Control ref={ref} className={styles.control({ class: className })} {...props}>
      {children}
      <Select.Indicator className={styles.indicator()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Select.Indicator>
    </Select.Control>
  );
});
SelectControl.displayName = "SelectControl";

export const SelectTrigger = Select.Trigger;
export const SelectValue = Select.ValueText;
export const SelectContent = forwardRef<
  ComponentRef<typeof Select.Content>,
  Select.ContentProps & { className?: string }
>(({ className, children, ...props }, ref) => {
  const styles = selectVariants();
  return (
    <Select.Positioner className={styles.positioner()}>
      <Select.Content ref={ref} className={styles.content({ class: className })} {...props}>
        {children}
      </Select.Content>
    </Select.Positioner>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = forwardRef<ComponentRef<typeof Select.Item>, Select.ItemProps>((props, ref) => {
  const styles = selectVariants();
  return (
    <Select.Item ref={ref} className={styles.item()} {...props}>
      <Select.ItemText className={styles.itemText()} />
      <Select.ItemIndicator className={styles.itemIndicator()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </Select.ItemIndicator>
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";
export { SelectItem };

export const SelectItemText = Select.ItemText;
export const SelectItemIndicator = Select.ItemIndicator;
export { selectVariants };
