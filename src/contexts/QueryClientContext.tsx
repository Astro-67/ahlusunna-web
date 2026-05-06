import {
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientProvider_,
  isServer,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.meta?.errorMessage) {
          console.error(query.meta.errorMessage, error)
        }
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}

interface QueryClientContextValue {
  queryClient: QueryClient
}

const QueryClientContext = createContext<QueryClientContextValue | null>(null)

export function useQueryClient() {
  const context = useContext(QueryClientContext)
  if (!context) {
    throw new Error('useQueryClient must be used within QueryClientProvider')
  }
  return context.queryClient
}

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient())

  const value = useMemo(
    () => ({
      queryClient,
    }),
    [queryClient],
  )

  return (
    <QueryClientContext.Provider value={value}>
      <QueryClientProvider_ client={queryClient}>
        {children}
      </QueryClientProvider_>
    </QueryClientContext.Provider>
  )
}