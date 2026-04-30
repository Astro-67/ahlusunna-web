import { Link } from '@tanstack/react-router'
import { BookOpen, LayoutDashboard, LogOut } from 'lucide-react'

import { LogoAdmin } from '#/components/common/Logo'
import { useLanguage } from '#/hooks/useLanguage'

interface AdminSidebarProps {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const { t } = useLanguage()

  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-accent/20 px-4">
        <LogoAdmin />
        <span className="bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
          {t('admin.badge')}
        </span>
      </div>

      <nav className="flex-1 py-4" aria-label="Admin">
        <Link
          to="/admin"
          className="flex items-center px-4 py-3 text-primary-foreground/80 transition-colors hover:bg-primary-dark hover:text-primary-foreground data-[status=active]:border-s-2 data-[status=active]:border-accent data-[status=active]:bg-primary-dark"
        >
          <LayoutDashboard aria-hidden="true" size={20} className="me-3" />
          <span className="text-sm">{t('admin.dashboard')}</span>
        </Link>
        <Link
          to="/admin/content"
          className="flex items-center px-4 py-3 text-primary-foreground/80 transition-colors hover:bg-primary-dark hover:text-primary-foreground data-[status=active]:border-s-2 data-[status=active]:border-accent data-[status=active]:bg-primary-dark"
        >
          <BookOpen aria-hidden="true" size={20} className="me-3" />
          <span className="text-sm">{t('navigation.content')}</span>
        </Link>
      </nav>

      <div className="border-t border-accent/20 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center px-4 py-3 text-primary-foreground/80 transition-colors hover:bg-primary-dark hover:text-primary-foreground"
        >
          <LogOut aria-hidden="true" size={20} className="me-3" />
          <span className="text-sm">{t('navigation.logout')}</span>
        </button>
      </div>
    </>
  )
}
