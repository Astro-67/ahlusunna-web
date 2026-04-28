import { createFileRoute, redirect } from '@tanstack/react-router'

import { AdminLayout } from '#/components/admin/AdminLayout'
import { ContentManager } from '#/components/admin/ContentManager'

export const Route = createFileRoute('/(admin)/admin/content')({
  component: AdminContentPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    if (!context.auth.isAdmin) {
      throw redirect({ to: '/' })
    }
  },
})

function AdminContentPage() {
  return (
    <AdminLayout>
      <ContentManager />
    </AdminLayout>
  )
}
