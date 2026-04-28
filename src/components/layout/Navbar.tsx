import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { LanguageToggle } from '#/components/shared/LanguageToggle'

function LogoMark() {
  return (
    <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4C12 8 8 12 8 18V28H24V18C24 12 20 8 16 4Z" fill="#C9A84C" />
      <rect x="4" y="14" width="3" height="14" fill="#C9A84C" />
      <rect x="25" y="14" width="3" height="14" fill="#C9A84C" />
    </svg>
  )
}

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

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

  const handleLogout = () => {
    logout()
    void navigate({ to: '/' })
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-40 h-14 border-b border-accent/20 bg-primary lg:h-16" aria-label="Primary">
      <div className="container-main flex h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground" aria-label="Ahlusunna">
          <LogoMark />
          <span className="text-lg font-bold tracking-normal">Ahlusunna</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/subjects" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
            {t('navigation.subjects')}
          </Link>
          <Link to="/about" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
            {t('navigation.about')}
          </Link>
          <Link to="/contact" className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground">
            {t('navigation.contact')}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle inverted />
          </div>

          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex items-center gap-2 text-primary-foreground"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {user.name.charAt(0)}
                </span>
                <ChevronDown aria-hidden="true" size={16} />
              </button>

              {userMenuOpen && (
                <div className="absolute end-0 top-full mt-2 w-48 border border-border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]" role="menu">
                  <div className="py-1">
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-foreground hover:bg-background" role="menuitem">
                        {t('navigation.dashboard')}
                      </Link>
                    )}
                    <Link to="/progress" className="block px-4 py-2 text-sm text-foreground hover:bg-background" role="menuitem">
                      {t('navigation.progress')}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-start text-sm text-destructive hover:bg-background"
                      role="menuitem"
                    >
                      <LogOut aria-hidden="true" size={16} />
                      {t('navigation.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">{t('navigation.login')}</Link>
            </Button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="text-primary-foreground lg:hidden"
            aria-label={mobileMenuOpen ? t('common.close') : 'Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 bg-primary/95 lg:hidden">
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <Link to="/subjects" className="text-2xl font-bold text-primary-foreground">
              {t('navigation.subjects')}
            </Link>
            <Link to="/about" className="text-2xl font-bold text-primary-foreground">
              {t('navigation.about')}
            </Link>
            <Link to="/contact" className="text-2xl font-bold text-primary-foreground">
              {t('navigation.contact')}
            </Link>
            {isAuthenticated ? (
              <Link to="/progress" className="text-2xl font-bold text-primary-foreground">
                {t('navigation.progress')}
              </Link>
            ) : (
              <Button asChild variant="accent" size="lg" className="mt-4">
                <Link to="/login">{t('navigation.login')}</Link>
              </Button>
            )}
            <div className="mt-4">
              <LanguageToggle expandedLabels inverted />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
