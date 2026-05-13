import { createFileRoute, redirect } from '@tanstack/react-router'

import { AdminLayout } from '#/components/admin/AdminLayout'

export const Route = createFileRoute('/author')({
  component: AuthorPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    if (context.auth.user?.role !== 'author' && context.auth.user?.role !== 'admin') {
      throw redirect({ to: '/' })
    }
  },
})

function AuthorPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-[24px] font-bold tracking-[-0.01em] text-foreground">Author Dashboard</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Create and manage lesson content. Your drafts will be reviewed by moderators.
        </p>
      </div>
      
      <div className="bg-white border border-border p-8 text-center">
        <p className="text-muted-foreground">Lesson creation interface coming soon.</p>
        <p className="mt-2 text-sm text-muted-foreground/70">
          As an author, you can create lessons and submit them for review.
        </p>
      </div>
    </AdminLayout>
  )
}