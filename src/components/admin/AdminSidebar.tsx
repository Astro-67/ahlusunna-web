import { Link, useRouterState, useNavigate } from '@tanstack/react-router'
import { BookOpen, LayoutDashboard, LogOut, Users, MessageSquare, Settings, FileText, AlertCircle, BarChart3, HelpCircle } from 'lucide-react'

import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface AdminSidebarProps {
  isCollapsed?: boolean
}

export function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  const { user, logout, isAdmin, isModerator } = useAuth()
  const { t, currentLang } = useLanguage()
  const routerState = useRouterState()
  const navigate = useNavigate()

  const roleLabel = isAdmin ? t('admin.role_admin') : isModerator ? t('admin.role_moderator') : t('admin.role_learner')
  const isRtl = currentLang === 'ar'

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    logout()
    void navigate({ to: '/login' })
  }

  return (
    <aside className="bg-primary flex flex-col h-full py-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Brand */}
      <div className={cn(
        "px-6 pb-6 mb-2 border-b border-white/10 flex items-center gap-3 transition-all",
        isCollapsed && "px-0 justify-center"
      )}>
        <Link to="/" className="shrink-0 transition-all hover:opacity-80">
          <img 
            src="/Ahlusunna-logo.png" 
            alt="Logo" 
            className={cn(
              "h-14 w-auto transition-all",
              isCollapsed && "h-10"
            )} 
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-bold text-[#FAF7F0] leading-none truncate">Ahlusunna</span>
            <span className="text-[10px] font-bold tracking-[0.08em] text-accent uppercase leading-none mt-1 truncate">
              {roleLabel}
            </span>
          </div>
        )}
      </div>

      {/* Admin Links */}
      {isAdmin && (
        <div className="py-4">
          {!isCollapsed && (
            <div className="px-6 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FAF7F0]/40">
              {t('admin.system_section')}
            </div>
          )}
          <Link
            to="/admin"
            className={cn(
              "flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium transition-colors border-transparent",
              !isCollapsed && (isRtl ? "border-r-[3px]" : "border-l-[3px]"),
              isCollapsed && "px-0 justify-center border-none",
              routerState.location.pathname === '/admin' 
                ? cn("bg-primary-dark text-white font-semibold", !isCollapsed && (isRtl ? "border-r-accent" : "border-l-accent"), isCollapsed && "text-accent")
                : "text-[#FAF7F0]/65 hover:bg-white/5 hover:text-white"
            )}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {!isCollapsed && <span>{t('admin.summary')}</span>}
          </Link>
          
          <Link
            to="/admin" 
            className={cn(
              "flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium transition-colors border-transparent",
              !isCollapsed && (isRtl ? "border-r-[3px]" : "border-l-[3px]"),
              isCollapsed && "px-0 justify-center border-none",
              "text-[#FAF7F0]/65 hover:bg-white/5 hover:text-white"
            )}
          >
            <Users size={18} className="shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 truncate">{t('admin.users_label')}</span>
                <span className="bg-accent text-foreground text-[10px] font-bold px-[7px] py-[2px]">2.4k</span>
              </>
            )}
          </Link>
        </div>
      )}

      {/* Moderator Links */}
      <div className="py-4">
        {!isCollapsed && (
          <div className="px-6 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FAF7F0]/40">
            {t('admin.tasks_section')}
          </div>
        )}
        <Link
          to="/moderator"
          className={cn(
            "flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium transition-colors border-transparent",
            !isCollapsed && (isRtl ? "border-r-[3px]" : "border-l-[3px]"),
            isCollapsed && "px-0 justify-center border-none",
            routerState.location.pathname === '/moderator' 
              ? cn("bg-primary-dark text-white font-semibold", !isCollapsed && (isRtl ? "border-r-accent" : "border-l-accent"), isCollapsed && "text-accent")
              : "text-[#FAF7F0]/65 hover:bg-white/5 hover:text-white"
          )}
        >
          <BookOpen size={18} className="shrink-0" />
          {!isCollapsed && <span className="flex-1 truncate">{t('admin.lessons_label')}</span>}
        </Link>
        
        <div className={cn(
            "flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium transition-colors border-transparent cursor-pointer",
            isCollapsed && "px-0 justify-center",
            "text-[#FAF7F0]/65 hover:bg-white/5 hover:text-white"
        )}>
          <FileText size={18} className="shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{t('admin.review_queue')}</span>
              <span className="bg-accent text-foreground text-[10px] font-bold px-[7px] py-[2px]">14</span>
            </>
          )}
        </div>
      </div>

      {/* Foot / User Profile */}
      <div className={cn(
        "mt-auto px-6 py-5 border-t border-white/10 flex items-center justify-between transition-all",
        isCollapsed && "px-0 justify-center flex-col gap-4 pb-8"
      )}>
        <div className={cn("flex items-center gap-2.5 min-w-0", isCollapsed && "flex-col")}>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-foreground">
            {getInitials(user?.name)}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[#FAF7F0] leading-tight truncate">
                {user?.name ?? 'User'}
              </div>
              <div className="text-[10px] text-[#FAF7F0]/45 leading-tight mt-0.5 truncate">
                {roleLabel}
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={handleLogout} 
          className={cn(
            "text-[#FAF7F0]/40 hover:text-accent transition-colors p-1.5 hover:bg-white/5 rounded-md",
            isCollapsed && "text-[#FAF7F0]/60"
          )} 
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

    </aside>
  )
}
