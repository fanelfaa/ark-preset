import { splitProps, type Component } from "solid-js";
import { cardVariants } from "@ark-preset/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = cardVariants();

type CardProps = HTMLArkProps<"div">;
type CardHeaderProps = HTMLArkProps<"div">;
type CardTitleProps = HTMLArkProps<"h3">;
type CardDescriptionProps = HTMLArkProps<"p">;
type CardContentProps = HTMLArkProps<"div">;
type CardFooterProps = HTMLArkProps<"div">;

const Card: Component<CardProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.root({ class: local.class })} {...others} />;
};

const CardHeader: Component<CardHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.header({ class: local.class })} {...others} />;
};

const CardTitle: Component<CardTitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h3 class={styles.title({ class: local.class })} {...others} />;
};

const CardDescription: Component<CardDescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.description({ class: local.class })} {...others} />;
};

const CardContent: Component<CardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.content({ class: local.class })} {...others} />;
};

const CardFooter: Component<CardFooterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.footer({ class: local.class })} {...others} />;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
