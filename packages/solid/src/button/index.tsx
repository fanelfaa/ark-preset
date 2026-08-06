import { splitProps, type Component, children } from "solid-js";
import { ButtonVariants, buttonVariants } from "@ark-preset/core";
import { ark, HTMLArkProps } from "@ark-ui/solid/factory";

type ButtonProps = HTMLArkProps<"button"> & ButtonVariants;

const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size", "children"]);

  const resolvedChildren = children(() => local.children);
  return (
    <ark.button
      class={buttonVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      })}
      {...others}
    >
      {resolvedChildren()}
    </ark.button>
  );
};

export { Button, buttonVariants };
