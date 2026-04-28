import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { LoginForm } from '#/components/auth/LoginForm'

interface LoginSearch {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function LoginPage() {
  const navigate = useNavigate()
  const search = Route.useSearch()

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-background px-4 py-12 lg:min-h-[calc(100svh-4rem)]">
      <LoginForm onSuccess={() => void navigate({ to: search.redirect ?? '/' })} />
    </div>
  )
}
