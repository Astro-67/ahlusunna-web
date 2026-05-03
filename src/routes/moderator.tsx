import { createFileRoute, redirect } from '@tanstack/react-router'

import { AdminLayout } from '#/components/admin/AdminLayout'
import { ContentManager } from '#/components/admin/ContentManager'

export const Route = createFileRoute('/moderator')({
  component: ModeratorPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    if (context.auth.user?.role !== 'moderator' && context.auth.user?.role !== 'admin') {
      throw redirect({ to: '/' })
    }
  },
})

function ModeratorPage() {
  return (
    <AdminLayout>
      <ContentManager />
    </AdminLayout>
  )
}
