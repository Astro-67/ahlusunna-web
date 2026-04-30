import { Link } from '@tanstack/react-router'

import { LogoFooter } from '#/components/common/Logo'
import { useLanguage } from '#/hooks/useLanguage'

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
    >
      {children}
    </Link>
  )
}

function FooterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-4 font-decorative text-lg font-semibold text-accent">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoFooter className="mb-6" />

            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/70">
              Jukwaa la kujifunza elimu ya Kiislamu kwa mpangilio wa hatua.
            </p>
          </div>

          <FooterSection title={t('navigation.subjects')}>
            <li>
              <FooterLink to="/subjects">{t('subjects.title')}</FooterLink>
            </li>
            <li>
              <FooterLink to="/about">{t('navigation.about')}</FooterLink>
            </li>
            <li>
              <FooterLink to="/contact">{t('navigation.contact')}</FooterLink>
            </li>
          </FooterSection>

          <FooterSection title={t('navigation.contact')}>
            <li>
              <a
                href="mailto:info@ahlusunna.info"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-accent"
                >
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 5L8 9L15 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                info@ahlusunna.info
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
                <path
                  d="M8 1C5.5 1 3 2.5 2 5C1.5 6 1 7.5 1 8C1 10 2.5 11.5 4 12.5C4.5 13 5.5 14 6 14C6.5 14 7 13.5 7.5 13L9 11C9.5 10.5 10 10.5 10.5 11C11 11.5 12 12 13 12C13.5 12 14 11.5 14 11C14 10.5 15 9 15 8C15 6 14 2.5 12 1.5C11 1 9.5 1 8 1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Zanzibar, Tanzania
            </li>
          </FooterSection>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Ahlusunna. All rights reserved.
            </p>

            <p className="font-arabic text-sm text-primary-foreground/50" dir="rtl">
              وبالجماعة ينفع الله
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
