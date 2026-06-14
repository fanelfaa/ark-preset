import { splitProps, type Component } from "solid-js";
import { skeletonVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

type SkeletonProps = HTMLArkProps<"div">;

const Skeleton: Component<SkeletonProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={skeletonVariants({ class: local.class })} {...others} />;
};

export { Skeleton, skeletonVariants };
