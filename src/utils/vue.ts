import type { RequiredKeys } from "@/types";
import { computed } from "vue";
import type { WatchSource, ComputedRef } from "vue";

export const toComputed = <T>(data: WatchSource<T>) =>
  computed(() => {
    if (typeof data === "function") return data();
    return data.value;
  });

export const toComputeds = <
  TOptions extends { readonly [key: string]: WatchSource<unknown> | undefined }
>(
  options: TOptions
) =>
  Object.entries(options).reduce(
    (acc, [key, data]) => ({ ...acc, [key]: data && toComputed(data) }),
    {} as {
      [key in keyof TOptions]: key extends RequiredKeys<TOptions>
        ? TOptions[key] extends WatchSource<infer T>
          ? ComputedRef<T>
          : never
        : TOptions[key] extends WatchSource<infer T> | undefined
        ? ComputedRef<T> | undefined
        : never;
    }
  );
