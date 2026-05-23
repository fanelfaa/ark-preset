import { createMemo, splitProps, type Component, Show, children } from "solid-js";
import { ButtonVariants, buttonVariants } from "@ui/core";
import { ark, HTMLArkProps } from "@ark-ui/solid/factory";

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
  const className = createMemo(() =>
    buttonVariants({
      variant: local.variant,
      size: local.size,
      loading: local.loading,
      class: local.class,
    }),
  );
  const resolvedChildren = children(() => local.children);
  return (
    <ark.button class={className()} disabled={isDisabled()} {...others}>
      {resolvedChildren()}
      <Show when={local.loading}>
        <span class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
          <svg
            class="size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      </Show>
    </ark.button>
  );
};

export { Button, buttonVariants };
