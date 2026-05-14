import { createFileRoute } from '@tanstack/react-router'
import { ContentManager } from '#/components/admin/ContentManager'

export const Route = createFileRoute('/dashboard/moderator/')({
  component: ModeratorPage,
})

function ModeratorPage() {
  return <ContentManager />
}