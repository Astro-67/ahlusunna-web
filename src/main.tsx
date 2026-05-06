import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { QueryClientProvider } from '#/contexts/QueryClientContext'
import { AudioPlayerProvider } from '#/contexts/AudioPlayerContext'
import { AuthProvider, useAuth } from '#/contexts/AuthContext'
import type { AuthContextValue } from '#/contexts/AuthContext'
import { LanguageProvider } from '#/contexts/LanguageContext'
import '#/i18n/config'
import './styles.css'

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined as unknown as AuthContextValue,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function AppRouter() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ auth }} />
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider>
        <LanguageProvider>
          <AuthProvider>
            <AudioPlayerProvider>
              <AppRouter />
            </AudioPlayerProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
}