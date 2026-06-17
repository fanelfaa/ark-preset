import { splitProps, type Component, Show, children } from "solid-js";
import { ButtonVariants, buttonVariants } from "@ark-preset/core";
import { ark, HTMLArkProps } from "@ark-ui/solid/factory";
import { Spinner } from "../spinner";

type ButtonProps = HTMLArkProps<"button"> &
  ButtonVariants & {
    loading?: boolean;
  };

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "variant",
    "size",
    "loading",
    "disabled",
    "children",
  ]);
  const isDisabled = () => local.loading || local.disabled;

  const resolvedChildren = children(() => local.children);
  return (
    <ark.button
      class={buttonVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      })}
      disabled={isDisabled()}
      {...others}
    >
      <Show when={local.loading}>
        <Spinner size="sm" />
      </Show>
      {resolvedChildren()}
    </ark.button>
  );
};

export { Button, buttonVariants };
