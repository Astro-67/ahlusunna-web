import { Link } from '@tanstack/react-router'

import { useLanguage } from '#/hooks/useLanguage'

function LogoMark() {
  return (
    <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4C12 8 8 12 8 18V28H24V18C24 12 20 8 16 4Z" fill="#C9A84C" />
      <rect x="4" y="14" width="3" height="14" fill="#C9A84C" />
      <rect x="25" y="14" width="3" height="14" fill="#C9A84C" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-bold">Ahlusunna</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {t('home.hero_subtitle')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">{t('navigation.subjects')}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/subjects" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  {t('subjects.title')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">{t('navigation.contact')}</h3>
            <p className="text-sm text-primary-foreground/70">info@ahlusunna.info</p>
            <p className="mt-1 text-sm text-primary-foreground/70">Zanzibar, Tanzania</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">© 2024 Ahlusunna. Haki zote zimehifadhiwa.</p>
          <span className="text-xs text-primary-foreground/50">ahlusunna.info</span>
        </div>
      </div>
    </footer>
  )
}
