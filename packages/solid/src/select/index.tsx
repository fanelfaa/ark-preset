import { Select as SelectBase } from "./select.base";
import type { Select as ArkSelect, SelectOpenChangeDetails } from "@ark-ui/solid/select";
import { Portal } from "solid-js/web";
import {
  Show,
  createSignal,
  createContext,
  useContext,
  type Accessor,
  splitProps,
  type Component,
} from "solid-js";
import { selectVariants } from "@fan-ui/core";
import { ScrollArea } from "../scroll-area";

const styles = selectVariants();

type SearchableContextValue = {
  searchable: boolean;
  searchValue: Accessor<string>;
  onSearch: (value: string) => void;
};

const SelectSearchableContext = createContext<SearchableContextValue>();

const useSelectSearchable = () => useContext(SelectSearchableContext);

type SelectProps = ArkSelect.RootProps<{ label: string; value: string }> & {
  error?: boolean;
  searchable?: boolean;
  onSearch?: (value: string) => void;
};

const Select: Component<SelectProps> = (props) => {
  const [local, others] = splitProps(props, [
    "searchable",
    "onSearch",
    "onOpenChange",
    "class",
    "error",
  ]);
  const [searchValue, setSearchValue] = createSignal("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    local.onSearch?.(value);
  };

  const handleOpenChange = (details: SelectOpenChangeDetails) => {
    if (details.open && local.searchable) {
      setSearchValue("");
      local.onSearch?.("");
    }
    local.onOpenChange?.(details);
  };

  return (
    <SelectSearchableContext.Provider
      value={{
        searchable: !!local.searchable,
        searchValue,
        onSearch: handleSearch,
      }}
    >
      <SelectBase.Root
        class={local.class}
        error={local.error}
        onOpenChange={handleOpenChange}
        {...others}
      />
    </SelectSearchableContext.Provider>
  );
};

const SelectLabel = SelectBase.Label;

type SelectTriggerProps = ArkSelect.TriggerProps & {
  placeholder?: string;
};

const SelectTrigger: Component<SelectTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "placeholder"]);
  return (
    <SelectBase.Control class={local.class}>
      <SelectBase.Trigger {...others}>
        <SelectBase.ValueText placeholder={local.placeholder ?? "Select..."} />
      </SelectBase.Trigger>
      <div class="flex items-center gap-1">
        <SelectBase.ClearTrigger>
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
            class="size-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </SelectBase.ClearTrigger>
        <SelectBase.Indicator>
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
            class="size-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </SelectBase.Indicator>
      </div>
    </SelectBase.Control>
  );
};

const SelectContent: Component<ArkSelect.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const ctx = useSelectSearchable();
  return (
    <Portal>
      <SelectBase.Positioner>
        <SelectBase.Content class={local.class} {...others}>
          <Show when={ctx?.searchable}>
            <input
              type="text"
              value={ctx!.searchValue()}
              onInput={(e) => ctx!.onSearch(e.currentTarget.value)}
              placeholder="Search..."
              class={styles.searchInput()}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </Show>
          <ScrollArea class="max-h-60" orientation="vertical">
            {local.children}
          </ScrollArea>
        </SelectBase.Content>
      </SelectBase.Positioner>
    </Portal>
  );
};

const SelectItem: Component<ArkSelect.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <SelectBase.Item {...others}>
      {typeof local.children === "string" ? (
        <SelectBase.ItemText>{local.children}</SelectBase.ItemText>
      ) : (
        local.children
      )}
      <SelectBase.ItemIndicator>
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
          class="size-4"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </SelectBase.ItemIndicator>
    </SelectBase.Item>
  );
};

const SelectRootProvider = SelectBase.RootProvider;

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectRootProvider,
  SelectBase,
};
export { selectVariants, type SelectVariants } from "@fan-ui/core";
