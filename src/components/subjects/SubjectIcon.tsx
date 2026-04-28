interface SubjectIconProps {
  icon: string
}

export function SubjectIcon({ icon }: SubjectIconProps) {
  if (icon === 'book-open') {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  }

  if (icon === 'scroll') {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v14a2 2 0 0 0 2 2z" />
      </svg>
    )
  }

  if (icon === 'mosque') {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M18 21V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v13" />
        <path d="M2 21h20" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M12 11v10" />
      </svg>
    )
  }

  if (icon === 'person-standing') {
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="5" r="2" />
        <path d="M10 10h4" />
        <path d="M10 22v-8l-2-4h8l-2 4v8" />
      </svg>
    )
  }

  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
    </svg>
  )
}
