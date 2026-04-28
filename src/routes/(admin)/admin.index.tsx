import { createFileRoute, redirect } from '@tanstack/react-router'
import { BookOpen, FileText, TrendingUp, Users } from 'lucide-react'

import { AdminLayout } from '#/components/admin/AdminLayout'
import { DashboardStats } from '#/components/admin/DashboardStats'
import { lessons, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/(admin)/admin/')({
  component: AdminDashboardPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    if (!context.auth.isAdmin) {
      throw redirect({ to: '/' })
    }
  },
})

function AdminDashboardPage() {
  const { t } = useLanguage()
  const stats = [
    { label: t('admin.total_lessons'), value: lessons.length, icon: BookOpen, color: 'bg-primary' },
    { label: t('admin.total_subjects'), value: subjects.length, icon: FileText, color: 'bg-accent text-accent-foreground' },
    { label: t('admin.users'), value: 3, icon: Users, color: 'bg-success' },
    { label: t('admin.new_content'), value: 2, icon: TrendingUp, color: 'bg-warning' },
  ]

  return (
    <AdminLayout>
      <h2 className="mb-6 text-[24px] font-bold text-foreground lg:text-[28px]">
        {t('admin.dashboard')}
      </h2>

      <DashboardStats stats={stats} />

      <div className="border border-border bg-white">
        <div className="border-b border-border p-4">
          <h3 className="text-[20px] font-semibold text-foreground lg:text-[22px]">
            {t('admin.recent_content')}
          </h3>
        </div>
        <div className="divide-y divide-border">
          {lessons.slice(0, 5).map((lesson) => (
            <div key={lesson.id} className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-background">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{lesson.title.sw}</p>
                <p className="text-xs text-muted-foreground">
                  {lesson.subjectId} • {lesson.createdAt}
                </p>
              </div>
              <span className="bg-primary/10 px-2 py-1 text-xs text-primary">{lesson.levelId}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
