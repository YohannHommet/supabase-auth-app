import { type UseFetchOptions, useFetch as vueUseFetch } from '@vueuse/core';
import { onUnmounted, type Ref, ref, unref, watch } from 'vue';

interface IUseFetchOptions<T> extends UseFetchOptions {
  url: string | Ref<string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  onResponse?: (response: T) => Promise<T>;
  onError?: (error: Error) => void;
}

export function useFetch<T>(options: IUseFetchOptions<T>): {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isFetching: Ref<boolean>;
  refetch: () => void;
} {
  const {
    url,
    method = 'GET',
    headers = {},
    body = null,
    immediate = true,
    refetch = false,
    initialData = null,
    updateDataOnError = false,
    beforeFetch,
    afterFetch,
    onFetchError,
    onResponse,
    onError,
  } = options;

  const data = ref<T | null>(initialData) as Ref<T | null>;
  const error = ref<Error | null>(null) as Ref<Error | null>;
  const isFetching = ref(false) as Ref<boolean>;
  const abortController = new AbortController();

  const fetchData = async () => {
    isFetching.value = true;
    error.value = null;

    try {
      const ctx = {
        url,
        options: {
          method,
          headers,
          body,
          signal: abortController.signal,
        },
        cancel: abortController.abort.bind(abortController),
      };

      if (beforeFetch) {
        const beforeFetchResult = await beforeFetch({
          url: unref(url),
          options: ctx.options,
          cancel: ctx.cancel,
        });
        Object.assign(ctx, beforeFetchResult);
      }

      const response = await vueUseFetch(ctx.url, ctx.options).get().json<T>();

      if (afterFetch) {
        const afterFetchResult = await afterFetch({
          data: response.data.value,
          response: response.response.value!,
        });
        Object.assign(response, afterFetchResult);
      }

      data.value = onResponse ? await onResponse(response.data.value!) : response.data.value;
    }
    catch (err: unknown) {
      error.value = err as Error;

      if (onFetchError) {
        const onFetchErrorResult = await onFetchError({ data: data.value, error: error.value, response: null });
        Object.assign(data, onFetchErrorResult.data);
        Object.assign(error, onFetchErrorResult.error);
      }

      if (updateDataOnError) {
        data.value = null;
      }

      if (onError) {
        onError(error.value);
      }
    }
    finally {
      isFetching.value = false;
    }
  };

  const refetchData = () => {
    abortController.abort();
    fetchData();
  };

  if (immediate) {
    fetchData();
  }

  if (refetch) {
    watch([url, body], () => {
      refetchData();
    });
  }

  onUnmounted(() => {
    abortController.abort();
  });

  return {
    data,
    error,
    isFetching,
    refetch: refetchData,
  };
}
