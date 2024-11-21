import { reactive, toRefs } from 'vue'

interface IUseFetchOptions {
  url: string
  options?: RequestInit
}

interface IUseFetchHookState<T> {
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  data: T | null
}

export async function useFetch<T>(options: IUseFetchOptions) {
  const state = reactive<IUseFetchHookState<T>>({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: null,
  })

  const fetchData = async () => {
    state.isLoading = true

    try {
      const response = await fetch(options.url, {
        ...options.options,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      state.data = await response.json()
    }
    catch (err: unknown) {
      const typedError = err as Error
      state.hasError = true
      state.errorMessage = typedError.message
    }
    finally {
      state.isLoading = false
    }
  }

  await fetchData()

  return {
    ...toRefs(state),
  }
}
