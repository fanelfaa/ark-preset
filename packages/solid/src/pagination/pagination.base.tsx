import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { paginationVariants, type PaginationVariants } from "@ark-preset/core";

type PaginationVariantContextValue = Pick<PaginationVariants, "size">;

const PaginationVariantContext = createContext<PaginationVariantContextValue>();

const usePaginationVariant = () => useContext(PaginationVariantContext);

const styles = paginationVariants();

const Root: Component<ArkPagination.RootProps & PaginationVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <PaginationVariantContext.Provider value={{ size: local.size }}>
      <ArkPagination.Root
        class={styles.root({ class: local.class, size: local.size })}
        {...others}
      />
    </PaginationVariantContext.Provider>
  );
};

const RootProvider: Component<ArkPagination.RootProviderProps & PaginationVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <PaginationVariantContext.Provider value={{ size: local.size }}>
      <ArkPagination.RootProvider
        class={styles.root({ class: local.class, size: local.size })}
        {...others}
      />
    </PaginationVariantContext.Provider>
  );
};

const Ellipsis: Component<ArkPagination.EllipsisProps> = (props) => {
  return <ArkPagination.Ellipsis {...props} />;
};

const FirstTrigger: Component<ArkPagination.FirstTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.FirstTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Item: Component<ArkPagination.ItemProps & PaginationVariants> = (props) => {
  const ctx = usePaginationVariant();
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <ArkPagination.Item
      class={styles.item({
        class: local.class,
        size: local.size ?? ctx?.size,
      })}
      {...others}
    />
  );
};

const LastTrigger: Component<ArkPagination.LastTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.LastTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const NextTrigger: Component<ArkPagination.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.NextTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const PrevTrigger: Component<ArkPagination.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.PrevTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

export const Pagination = {
  Root,
  RootProvider,
  Ellipsis,
  FirstTrigger,
  Item,
  LastTrigger,
  NextTrigger,
  PrevTrigger,
};

export { PaginationVariantContext, usePaginationVariant };
