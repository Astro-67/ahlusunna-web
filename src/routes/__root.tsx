import { Outlet, createRootRouteWithContext, useRouterState  } from '@tanstack/react-router'

import { PersistentAudioPlayer } from '#/components/audio/PersistentAudioPlayer'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import type { AuthContextValue } from '#/contexts/AuthContext'

interface RouterContext {
  auth: AuthContextValue
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isDashboardRoute = pathname.startsWith('/admin') || pathname.startsWith('/moderator')

  if (isDashboardRoute) {
    return <Outlet />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-14 sm:pt-16 lg:pt-[76px]">
        <Outlet />
      </main>
      <PersistentAudioPlayer />
      <Footer />
    </div>
  )
}
