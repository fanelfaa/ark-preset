import { splitProps, type Component } from "solid-js";
import { badgeVariants, type BadgeVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

type BadgeProps = HTMLArkProps<"span"> & BadgeVariants;

const Badge: Component<BadgeProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);

  return (
    <ark.span class={badgeVariants({ variant: local.variant, class: local.class })} {...others} />
  );
};

export { Badge, badgeVariants };
