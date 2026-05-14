import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardTopbar } from './DashboardTopbar'
import type { Role } from './dashboard-nav.config'

interface DashboardLayoutProps {
  role: Role
  children: ReactNode
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const { i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <div
      className="min-h-screen bg-[#FAF7F0]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Sidebar - fixed to leading edge (left in LTR, right in RTL) */}
      <DashboardSidebar role={role} isRtl={isRtl} />

      {/* Main content wrapper */}
      <div
        className={`flex flex-col min-h-screen ms-[264px]`}
      >
        {/* Topbar */}
        <DashboardTopbar role={role} isRtl={isRtl} />

        {/* Page content */}
        <main className="flex-1 p-8 bg-[#FAF7F0]">
          {children}
        </main>
      </div>
    </div>
  )
}