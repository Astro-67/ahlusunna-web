import { useNavigate } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState  } from 'react'
import type {ReactNode} from 'react';

import { AdminSidebar } from '#/components/admin/AdminSidebar'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    void navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={
          sidebarOpen
            ? 'fixed inset-y-0 start-0 z-50 flex w-60 translate-x-0 flex-col bg-primary text-primary-foreground transition-transform duration-200 lg:translate-x-0'
            : 'fixed inset-y-0 start-0 z-50 flex w-60 -translate-x-full flex-col bg-primary text-primary-foreground transition-transform duration-200 rtl:translate-x-full lg:translate-x-0'
        }
      >
        <AdminSidebar onLogout={handleLogout} />
      </aside>

      <main className="lg:ms-60">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="text-foreground lg:hidden"
              aria-label="Menu"
              aria-expanded={sidebarOpen}
            >
              <Menu aria-hidden="true" size={24} />
            </button>
            <h1 className="text-[20px] font-semibold text-foreground lg:text-[22px]">
              {t('admin.content_manager')}
            </h1>
          </div>
          <div className="flex min-w-0 items-center gap-4">
            <span className="hidden truncate text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </main>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label={t('common.close')}
        />
      )}
    </div>
  )
}
