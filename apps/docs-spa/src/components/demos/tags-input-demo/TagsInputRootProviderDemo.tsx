import { Index } from "solid-js";
import { TagsInputBase } from "@fan-ui/solid";
import { useTagsInput } from "@ark-ui/solid/tags-input";

export default function TagsInputRootProviderDemo() {
  const tagsInput = useTagsInput({ defaultValue: ["React", "Solid"] });
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Tags: {tagsInput().value.join(", ")}</p>
        <TagsInputBase.RootProvider value={tagsInput}>
          <TagsInputBase.Label>Frameworks</TagsInputBase.Label>
          <TagsInputBase.Control>
            <TagsInputBase.Context>
              {(api) => (
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
              )}
            </TagsInputBase.Context>
            <TagsInputBase.Input placeholder="Add a tag..." />
            <TagsInputBase.ClearTrigger>
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </TagsInputBase.ClearTrigger>
          </TagsInputBase.Control>
        </TagsInputBase.RootProvider>
      </div>
    </div>
  );
}
