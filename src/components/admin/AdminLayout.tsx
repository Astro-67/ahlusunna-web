import { useState } from 'react'
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { AdminSidebar } from '#/components/admin/AdminSidebar'
import { cn } from '#/lib/utils'
import { useLanguage } from '#/hooks/useLanguage'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { currentLang } = useLanguage()
  const isRtl = currentLang === 'ar'

  return (
    <div className="h-[calc(100vh-64px)] bg-background flex flex-col md:flex-row overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-primary text-white border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="/Logos/Logo-with-no-background/horizontal-logo-with-border-for-green-bg.png"
            alt="Ahlusunna"
            className="h-12 w-auto object-contain"
          />
          <span className="text-[10px] font-bold tracking-[0.18em] text-accent uppercase">
            Admin
          </span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Wrapper */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out z-50",
          sidebarOpen ? "fixed inset-0" : "hidden md:block md:relative",
          isCollapsed ? "md:w-[70px]" : "md:w-[240px]"
        )}
      >
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/60 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Actual Sidebar */}
        <div className={cn(
          "relative h-full transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]"
        )}>
          <AdminSidebar isCollapsed={isCollapsed} />
          
          {/* Collapse Toggle Button (Desktop Only) */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "hidden md:flex absolute top-1/2 -translate-y-1/2 size-6 items-center justify-center bg-accent text-foreground rounded-full shadow-md z-[60] transition-all",
              isRtl 
                ? (isCollapsed ? "-left-3" : "-left-3") 
                : (isCollapsed ? "-right-3" : "-right-3")
            )}
            title={isCollapsed ? "Panua (Expand)" : "Funga (Collapse)"}
          >
            {isCollapsed 
              ? (isRtl ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />) 
              : (isRtl ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />)
            }
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10 bg-background overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
