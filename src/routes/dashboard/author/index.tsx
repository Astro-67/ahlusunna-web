import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '#/components/layout/DashboardLayout'

export const Route = createFileRoute('/dashboard/author/')({
  component: AuthorPage,
})

function AuthorPage() {
  return (
    <DashboardLayout role="author">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold tracking-[-0.01em] text-foreground">Author Dashboard</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Create and manage lesson content. Your drafts will be reviewed by moderators.
        </p>
      </div>
    </DashboardLayout>
  )
}