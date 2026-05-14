import { useState, useRef, useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { ChevronUp, LogOut, User, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '#/hooks/useAuth'
import type { Role } from './dashboard-nav.config'

interface DashboardSidebarUserCardProps {
  role: Role
  isRtl: boolean
}

export function DashboardSidebarUserCard({ role, isRtl }: DashboardSidebarUserCardProps) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false)
      }
    }

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopoverOpen])

  const roleLabelMap: Record<Role, string> = {
    author: 'dashboard.role.author',
    moderator: 'dashboard.role.moderator',
    admin: 'dashboard.role.admin',
  }

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/' })
  }

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="p-4 border-t border-white/10 shrink-0">
      {/* User Card */}
      <div
        ref={cardRef}
        className="relative"
      >
        <button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className={`
            w-full flex items-center p-3 transition-colors
            bg-white/5 hover:bg-white/10 rounded
            ${isPopoverOpen ? 'bg-white/10' : ''}
          `}
        >
          {/* Avatar - circular gold background */}
          <div className="w-9 h-9 rounded-full bg-[#C9A84C] text-[#1B4332] flex items-center justify-center font-bold shrink-0">
            {userInitial}
          </div>

          {/* Name + Role - aligned to start */}
          <div className={`flex-1 overflow-hidden ${isRtl ? 'text-right me-3' : 'text-start ms-3'}`}>
            <p className="font-sans text-sm font-semibold text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="font-sans text-[11px] font-medium text-[#C9A84C] uppercase tracking-[0.08em] truncate">
              {t(roleLabelMap[role])}
            </p>
          </div>

          {/* Chevron - points up when open */}
          <ChevronUp
            size={14}
            className={`
              text-white/50 shrink-0 transition-transform
              ${isPopoverOpen ? 'rotate-180' : ''}
            `}
          />
        </button>

        {/* Popover - appears above the card */}
        {isPopoverOpen && (
          <div
            className={`
              absolute bottom-full w-full mb-2 bg-white rounded shadow-lg overflow-hidden z-50
              ${isRtl ? 'start-0' : 'end-0'}
            `}
          >
            <Link
              to="/dashboard/author"
              onClick={() => setIsPopoverOpen(false)}
              className="flex items-center px-4 py-3 text-sm text-[#1C1C1C] hover:bg-[#F4EFE6] transition-colors"
            >
              <User size={16} className="me-3 text-[#6B7280]" />
              {t('dashboard.nav.profile')}
            </Link>
            <Link
              to="/dashboard/admin"
              onClick={() => setIsPopoverOpen(false)}
              className="flex items-center px-4 py-3 text-sm text-[#1C1C1C] hover:bg-[#F4EFE6] transition-colors"
            >
              <Settings size={16} className="me-3 text-[#6B7280]" />
              {t('dashboard.nav.settings')}
            </Link>
            <div className="border-t border-[#E5E0D8]" />
            <button
              onClick={() => {
                setIsPopoverOpen(false)
                handleLogout()
              }}
              className="w-full flex items-center px-4 py-3 text-sm text-[#9B2335] hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} className="me-3" />
              {t('dashboard.nav.logout')}
            </button>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`
          w-full flex items-center mt-2 px-4 py-2
          font-sans text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors
        `}
      >
        <LogOut size={16} className="shrink-0 me-2.5" />
        {t('dashboard.nav.logout')}
      </button>
    </div>
  )
}