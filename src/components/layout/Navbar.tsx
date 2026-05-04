import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { LogoNavbar } from '#/components/common/Logo'
import { LanguageToggle } from '#/components/shared/LanguageToggle'
import { Button } from '#/components/ui/button'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import type { Language } from '#/types'

type NavTarget = '/' | '/about' | '/contact' | '/subjects'

const navLabels: Record<
  Language,
  {
    home: string
    about: string
    contact: string
    lesson: string
    login: string
    menu: string
    close: string
  }
> = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    lesson: 'Lesson',
    login: 'Login',
    menu: 'Menu',
    close: 'Close menu',
  },
  sw: {
    home: 'Nyumbani',
    about: 'Kuhusu',
    contact: 'Wasiliana',
    lesson: 'Masomo',
    login: 'Ingia',
    menu: 'Menyu',
    close: 'Funga menyu',
  },
  ar: {
    home: 'الرئيسية',
    about: 'عن المنصة',
    contact: 'تواصل',
    lesson: 'الدروس',
    login: 'دخول',
    menu: 'القائمة',
    close: 'إغلاق القائمة',
  },
}

function isActivePath(pathname: string, to: NavTarget) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(to + '/')
}

function NavLink({
  to,
  children,
  onClick,
}: {
  to: NavTarget
  children: ReactNode
  onClick?: () => void
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isActive = isActivePath(pathname, to)

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary',
      )}
    >
      {children}
      {isActive && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-accent" />}
    </Link>
  )
}

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { currentLang, t } = useLanguage()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const labels = navLabels[currentLang]

  const navItems: Array<{ to: NavTarget; label: string }> = [
    { to: '/', label: labels.home },
    { to: '/about', label: labels.about },
    { to: '/contact', label: labels.contact },
    { to: '/subjects', label: labels.lesson },
  ]

  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    void navigate({ to: '/' })
  }

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-40 h-20 border-b border-border/70 bg-background/96 backdrop-blur-md transition-shadow duration-300 sm:h-24 lg:h-28',
        scrolled && 'shadow-[0_10px_30px_rgba(27,67,50,0.08)]',
      )}
      aria-label="Primary"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Ahlusunna home">
          <LogoNavbar />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex h-9 items-center gap-2 rounded-[8px] border border-border bg-card px-2 text-primary transition-colors hover:bg-secondary sm:h-10"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <span className="flex size-7 items-center justify-center rounded-[6px] bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('size-4 transition-transform', userMenuOpen && 'rotate-180')}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute inset-e-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-[8px] border border-border bg-popover text-popover-foreground shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
                  role="menu"
                >
                  <div className="border-b border-border bg-muted px-4 py-3">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="py-1">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                        role="menuitem"
                      >
                        <LayoutDashboard aria-hidden="true" className="size-4 text-accent" />
                        {t('navigation.dashboard')}
                      </Link>
                    )}
                    <Link
                      to="/progress"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                      role="menuitem"
                    >
                      <UserRound aria-hidden="true" className="size-4 text-accent" />
                      {t('navigation.progress')}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm text-destructive transition-colors hover:bg-secondary"
                      role="menuitem"
                    >
                      <LogOut aria-hidden="true" className="size-4" />
                      {t('navigation.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button asChild variant="accent" size="sm" className="hidden md:inline-flex">
              <Link to="/login">{labels.login}</Link>
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? labels.close : labels.menu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-20 z-50 max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-border bg-background shadow-[0_18px_50px_rgba(27,67,50,0.14)] sm:top-24 sm:max-h-[calc(100svh-6rem)] lg:hidden">
          <div className="container-main flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <LanguageToggle expandedLabels />
              {isAuthenticated ? (
                <Button asChild variant="outline" size="lg">
                  <Link to="/progress">{t('navigation.progress')}</Link>
                </Button>
              ) : (
                <Button asChild variant="accent" size="lg">
                  <Link to="/login">{labels.login}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
