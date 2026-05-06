import { useEffect, useState } from 'react'

interface Options {
  rootMargin?: string
  threshold?: number | number[]
}

export const useScrollSpy = (
  ids: string[],
  options: Options = {},
): string | null => {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (ids.length === 0) {
      setActiveId(null)
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }
        if (visible.size === 0) return
        let bestId: string | null = null
        let bestTop = Number.POSITIVE_INFINITY
        for (const id of visible.keys()) {
          const node = document.getElementById(id)
          if (!node) continue
          const top = node.getBoundingClientRect().top
          if (top < bestTop) {
            bestTop = top
            bestId = id
          }
        }
        if (bestId) setActiveId(bestId)
      },
      {
        rootMargin: options.rootMargin ?? '-120px 0px -55% 0px',
        threshold: options.threshold ?? [0, 0.25, 0.5, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, options.rootMargin, options.threshold])

  return activeId
}
