import { createFileRoute } from '@tanstack/react-router'
import { ContentManager } from '#/components/admin/ContentManager'

export const Route = createFileRoute('/dashboard/admin/content')({
  component: AdminContentPage,
})

function AdminContentPage() {
  return <ContentManager />
}