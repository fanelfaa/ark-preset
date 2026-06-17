import { useRatingGroup } from "@ark-ui/solid/rating-group";
import { RatingGroupBase } from "@ark-preset/solid";
import { Index } from "solid-js";

export default function RatingGroupRootProviderDemo() {
  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

  return (
    <div class="rounded-lg border border-border p-6">
      <p class="text-sm text-muted-foreground mb-2">RootProvider: {ratingGroup().value}</p>
      <RatingGroupBase.RootProvider value={ratingGroup}>
        <RatingGroupBase.Label>Rate this</RatingGroupBase.Label>
        <RatingGroupBase.Context>
          {(context) => (
            <RatingGroupBase.Control>
              <Index each={context().items}>
                {(item) => (
                  <RatingGroupBase.Item index={item()}>
                    <RatingGroupBase.ItemContext>
                      {() => (
                        <span class="relative inline-flex items-center justify-center size-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-full"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="absolute inset-0 size-full opacity-0 group-data-[highlighted]:opacity-100 group-data-[half]:[clip-path:inset(0_50%_0_0)]"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </span>
                      )}
                    </RatingGroupBase.ItemContext>
                  </RatingGroupBase.Item>
                )}
              </Index>
              <RatingGroupBase.HiddenInput />
            </RatingGroupBase.Control>
          )}
        </RatingGroupBase.Context>
      </RatingGroupBase.RootProvider>
    </div>
  );
}
