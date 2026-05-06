import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import { useScrollSpy } from './useScrollSpy'

interface RightRailTOCProps {
  headings: { id: string; text: string }[]
}

export function RightRailTOC({ headings }: RightRailTOCProps) {
  const { t } = useLanguage()
  const ids = headings.map((h) => h.id)
  const activeId = useScrollSpy(ids)

  if (headings.length === 0) return null
  const label = t('lesson.on_this_page')

  return (
    <aside className="hidden lg:block lg:w-[240px] lg:shrink-0">
      <nav
        aria-label={label}
        className="sticky top-28 flex flex-col gap-3 border-s border-border ps-5"
      >
        <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </h2>
        <ul className="flex flex-col">
          {headings.map((h) => {
            const isActive = h.id === activeId
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={cn(
                    'block border-s-2 py-2 ps-3 text-[13px] leading-[1.4] transition-colors min-h-[44px]',
                    isActive
                      ? 'border-primary font-semibold text-primary'
                      : 'border-transparent text-muted-foreground hover:border-accent hover:text-accent',
                  )}
                  style={{ marginInlineStart: '-1px' }}
                  onClick={(event) => {
                    event.preventDefault()
                    const node = document.getElementById(h.id)
                    if (node) {
                      const top = node.getBoundingClientRect().top + window.scrollY - 110
                      window.scrollTo({ top, behavior: 'smooth' })
                      window.history.replaceState(null, '', `#${h.id}`)
                    }
                  }}
                >
                  {h.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
