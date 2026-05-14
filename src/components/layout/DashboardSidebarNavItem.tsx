import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { DashboardNavItem } from './dashboard-nav.config'

interface DashboardSidebarNavItemProps {
  item: DashboardNavItem
  isActive: boolean
  isRtl: boolean
  onClick?: () => void
}

export function DashboardSidebarNavItem({
  item,
  isActive,
  isRtl,
  onClick,
}: DashboardSidebarNavItemProps) {
  const { t } = useTranslation()
  const Icon = item.icon
  const isAccent = item.variant === 'accent'

  const getActiveBarPosition = () => {
    return isRtl ? 'right-0' : 'left-0'
  }

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`
        group relative flex items-center h-11 px-6 transition-colors duration-150
        ${isAccent
          ? 'bg-[#C9A84C]/10 text-[#E8C870] hover:bg-[#C9A84C]/20'
          : 'bg-transparent text-white/78 hover:bg-white/5 hover:text-white/95'
        }
        ${isActive
          ? isAccent
            ? '!bg-[#C9A84C]/15 !text-white font-semibold'
            : '!bg-white/10 !text-white font-semibold'
          : ''
        }
      `}
    >
      {/* Active indicator bar - pinned to leading edge */}
      {isActive && (
        <span
          className={`
            absolute top-0 h-full w-[3px] bg-[#C9A84C]
            ${getActiveBarPosition()}
          `}
        />
      )}

      {/* Icon */}
      <Icon
        size={18}
        className={`
          shrink-0 transition-colors
          ${isAccent ? 'text-[#C9A84C]' : 'text-white/78 group-hover:text-white'}
          ${isActive ? '!text-[#C9A84C]' : ''}
        `}
      />

      {/* Label */}
      <span
        className={`
          ms-3 font-sans text-sm transition-colors
          ${isAccent && !isActive ? 'text-[#E8C870]' : ''}
          ${isActive ? 'text-white' : ''}
        `}
      >
        {t(item.labelKey)}
      </span>
    </Link>
  )
}