import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRouterState } from '@tanstack/react-router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { dashboardNavConfig, type Role } from './dashboard-nav.config'

interface DashboardTopbarProps {
  role: Role
  isRtl: boolean
}

export function DashboardTopbar({ role, isRtl }: DashboardTopbarProps) {
  const { t, i18n } = useTranslation()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const roleConfig = dashboardNavConfig[role]

  // Find matching nav item and check for nested routes
  const findNavInfo = (path: string) => {
    const currentItem = roleConfig.items.find(item => item.to === path)
    if (currentItem) {
      return { current: currentItem, parent: null }
    }

    for (const item of roleConfig.items) {
      if (path !== item.to && path.startsWith(item.to + '/')) {
        return { current: item, parent: null }
      }
    }

    return { current: null, parent: null }
  }

  const navInfo = findNavInfo(currentPath)

  // Format today's date based on language
  const formatDate = (lang: string) => {
    const today = new Date()
    const localeMap: Record<string, string> = {
      sw: 'sw-KE',
      ar: 'ar-SA',
      en: 'en-US',
    }

    const dateFormatter = new Intl.DateTimeFormat(localeMap[lang] || 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    return dateFormatter.format(today)
  }

  // Page title from current nav item or fallback to role label
  const pageTitle = navInfo.current ? t(navInfo.current.labelKey) : t(roleConfig.roleLabelKey)

  // For top-level routes, just show title. For nested routes, show breadcrumb
  const isTopLevel = roleConfig.items.some(item => item.to === currentPath)

  // Notifications - hardcoded false for now (placeholder)
  const hasNotifications = false

  // Helper to find parent item label for breadcrumb
  const findParentLabel = (currentTo: string): string => {
    const parentTo = currentTo.split('/').slice(0, -1).join('/')
    const parent = roleConfig.items.find(item => item.to === parentTo)
    return parent ? t(parent.labelKey) : ''
  }

  return (
    <header
      className={`
        h-16 bg-white border-b border-[#E8E2D3] flex items-center shrink-0
        ps-[264px]
      `}
    >
      <div className="flex-1 flex items-center justify-between px-4 xl:px-8">
        {/* Page title - always visible */}
        <div className="flex items-center min-w-0">
          {isTopLevel ? (
            <h1 className="font-['Fraunces'] text-[16px] xl:text-[20px] font-medium text-[#1B4332] truncate">
              {pageTitle}
            </h1>
          ) : navInfo.current ? (
            <div className="flex items-center min-w-0">
              <span className="font-['Fraunces'] text-[16px] xl:text-[20px] font-medium text-[#1B4332] hidden sm:block truncate">
                {findParentLabel(navInfo.current.to)}
              </span>
              <span className="font-sans text-sm text-[#6B7280] mx-2 hidden sm:block">
                /
              </span>
              <span className="font-['Fraunces'] text-[16px] xl:text-[20px] font-medium text-[#1B4332] truncate">
                {pageTitle}
              </span>
            </div>
          ) : (
            <h1 className="font-['Fraunces'] text-[16px] xl:text-[20px] font-medium text-[#1B4332] truncate">
              {pageTitle}
            </h1>
          )}
        </div>

        {/* Controls - right side */}
        <div className={`flex items-center gap-3 md:gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
          {/* Date display with divider - hidden on mobile */}
          <div className={`hidden md:flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`h-5 w-px bg-[#E8E2D3] ${isRtl ? 'ms-4 me-0' : 'me-4 ms-0'}`} />
            <span className="font-sans text-[13px] text-[#6B7280] whitespace-nowrap">
              {formatDate(i18n.language)}
            </span>
          </div>

          {/* Language switcher */}
          <LanguageSwitcher size="sm" />

          {/* Notifications bell - hidden on mobile */}
          <button
            className="hidden sm:block relative text-[#6B7280] hover:text-[#1B4332] transition-colors p-1"
            aria-label={t('dashboard.topbar.notifications')}
          >
            <Bell size={20} />
            {hasNotifications && (
              <span className="absolute top-0 -right-0.5 block h-2 w-2 rounded-full bg-[#C9A84C] ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}