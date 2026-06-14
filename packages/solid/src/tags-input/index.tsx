import { Index, splitProps, type Component } from "solid-js";
import { TagsInput as TagsInputBase } from "./tags-input.base";
import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import type { TagsInputVariants } from "@fan-ui/core";

const TagsInputItem: Component<ArkTagsInput.ItemProps & TagsInputVariants> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <TagsInputBase.Item {...others}>
      <TagsInputBase.ItemPreview>
        <TagsInputBase.ItemText>{local.children}</TagsInputBase.ItemText>
        <TagsInputBase.ItemDeleteTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </TagsInputBase.ItemDeleteTrigger>
      </TagsInputBase.ItemPreview>
      <TagsInputBase.ItemInput />
    </TagsInputBase.Item>
  );
};

type TagsInputProps = ArkTagsInput.RootProps & {
  label?: string;
};

const TagsInput: Component<TagsInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "disabled", "label"]);
  return (
    <TagsInputBase.Root class={local.class} disabled={local.disabled} {...others}>
      <TagsInputBase.Context>
        {(api) => (
          <>
            {local.label && <TagsInputBase.Label>{local.label}</TagsInputBase.Label>}
            {local.children}
            <TagsInputBase.Control>
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInputBase.Item index={index} value={value()}>
                    <TagsInputBase.ItemPreview>
                      <TagsInputBase.ItemText>{value()}</TagsInputBase.ItemText>
                      <TagsInputBase.ItemDeleteTrigger>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </TagsInputBase.ItemDeleteTrigger>
                    </TagsInputBase.ItemPreview>
                    <TagsInputBase.ItemInput />
                  </TagsInputBase.Item>
                )}
              </Index>
              <TagsInputBase.Input />
            </TagsInputBase.Control>
          </>
        )}
      </TagsInputBase.Context>
      <TagsInputBase.HiddenInput />
    </TagsInputBase.Root>
  );
};

export { TagsInput, TagsInputItem, TagsInputBase };

export { tagsInputVariants, type TagsInputVariants } from "@fan-ui/core";
