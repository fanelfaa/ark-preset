import { splitProps, type Component } from "solid-js";
import { alertVariants, type AlertVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = alertVariants();

type AlertProps = HTMLArkProps<"div"> & AlertVariants;

const Alert: Component<AlertProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return (
    <ark.div
      role="alert"
      class={styles.root({ variant: local.variant, class: local.class })}
      {...others}
    />
  );
};

type AlertTitleProps = HTMLArkProps<"h5">;

const AlertTitle: Component<AlertTitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h5 class={styles.title({ class: local.class })} {...others} />;
};

type AlertDescriptionProps = HTMLArkProps<"div">;

const AlertDescription: Component<AlertDescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.description({ class: local.class })} {...others} />;
};

type AlertActionProps = HTMLArkProps<"div">;

const AlertAction: Component<AlertActionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.action({ class: local.class })} {...others} />;
};

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
