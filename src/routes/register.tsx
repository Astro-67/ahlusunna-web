import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { RegisterForm } from '#/components/auth/RegisterForm'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-background px-4 py-12 lg:min-h-[calc(100svh-4rem)]">
      <RegisterForm onSuccess={() => void navigate({ to: '/' })} />
    </div>
  )
}
