import { splitProps, type Component } from "solid-js";
import { breadcrumbVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = breadcrumbVariants();

type BreadcrumbProps = HTMLArkProps<"nav">;
type BreadcrumbListProps = HTMLArkProps<"ol">;
type BreadcrumbItemProps = HTMLArkProps<"li">;
type BreadcrumbLinkProps = HTMLArkProps<"a">;
type BreadcrumbPageProps = HTMLArkProps<"span">;
type BreadcrumbSeparatorProps = HTMLArkProps<"li">;
type BreadcrumbEllipsisProps = HTMLArkProps<"span">;

const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.nav aria-label="breadcrumb" class={local.class} {...others} />;
};

const BreadcrumbList: Component<BreadcrumbListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.ol class={styles.list({ class: local.class })} {...others} />;
};

const BreadcrumbItem: Component<BreadcrumbItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.li class={styles.item({ class: local.class })} {...others} />;
};

const BreadcrumbLink: Component<BreadcrumbLinkProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.a class={styles.link({ class: local.class })} {...others} />;
};

const BreadcrumbPage: Component<BreadcrumbPageProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.span class={styles.page({ class: local.class })} {...others} />;
};

const BreadcrumbSeparator: Component<BreadcrumbSeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ark.li class={styles.separator({ class: local.class })} {...others}>
      {local.children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </ark.li>
  );
};

const BreadcrumbEllipsis: Component<BreadcrumbEllipsisProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ark.span class={styles.ellipsis({ class: local.class })} {...others}>
      {local.children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      )}
    </ark.span>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
};
