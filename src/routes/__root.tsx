import { Outlet, createRootRouteWithContext, useRouterState, Link  } from '@tanstack/react-router'

import { PersistentAudioPlayer } from '#/components/audio/PersistentAudioPlayer'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import type { AuthContextValue } from '#/contexts/AuthContext'

interface RouterContext {
  auth: AuthContextValue
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
})

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold text-destructive">Something went wrong</h1>
      <p className="mb-6 text-muted-foreground">{error.message}</p>
      <Link to="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  )
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-6 text-xl text-muted-foreground">Page not found</p>
      <Link
        to="/"
        className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
      >
        Go Home
      </Link>
    </div>
  )
}

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isDashboardRoute = pathname.startsWith('/admin') || pathname.startsWith('/moderator')

  if (isDashboardRoute) {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28">
        <Outlet />
      </main>
      <PersistentAudioPlayer />
      <Footer />
    </div>
  )
}
