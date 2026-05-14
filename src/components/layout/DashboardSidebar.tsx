import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { DashboardSidebarNavItem } from './DashboardSidebarNavItem'
import { DashboardSidebarUserCard } from './DashboardSidebarUserCard'
import { dashboardNavConfig } from './dashboard-nav.config'
import type { Role } from './dashboard-nav.config'

interface DashboardSidebarProps {
  role: Role
  isRtl: boolean
}

export function DashboardSidebar({ role, isRtl }: DashboardSidebarProps) {
  const { t } = useTranslation()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const roleConfig = dashboardNavConfig[role]

  // Find the best matching nav item for current route
  const findActiveItem = (path: string) => {
    if (roleConfig.items.some(item => item.to === path)) {
      return path
    }
    const matchingItem = roleConfig.items.find(item =>
      path !== item.to && path.startsWith(item.to + '/')
    )
    return matchingItem?.to || null
  }

  const activeItemTo = findActiveItem(currentPath)

  return (
    <aside
      className={`
        w-[264px] bg-[#1B4332] flex flex-col fixed inset-y-0 z-40 shrink-0
        ${isRtl ? 'right-0' : 'left-0'}
      `}
    >
      {/* SECTION 1: Logo Masthead */}
      <div className="h-[140px] bg-[#0F2A1F] flex items-center justify-center border-b border-white/10 shrink-0">
        <img
          src="/Logos/Logo-with-no-background/logo-white-version.png"
          alt="Ahlusunna"
          className="h-24 w-auto object-contain"
        />
      </div>

      {/* SECTION 2: Role Label Strip */}
      <div className="h-11 flex items-center ps-6 border-b border-white/10 shrink-0">
        <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-sm shrink-0 me-3" />
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]">
          {t(roleConfig.roleLabelKey)}
        </span>
      </div>

      {/* SECTION 3: Navigation */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto scrollbar-none">
        {roleConfig.items.map((item) => (
          <DashboardSidebarNavItem
            key={item.to}
            item={item}
            isActive={activeItemTo === item.to}
            isRtl={isRtl}
          />
        ))}
      </nav>

      {/* SECTION 4: Footer */}
      <DashboardSidebarUserCard role={role} isRtl={isRtl} />
    </aside>
  )
}