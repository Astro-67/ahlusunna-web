export function LessonSkeleton() {
  return (
    <div className="container-main py-10 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-12 lg:flex-row">
        <div className="mx-auto w-full max-w-[720px] flex-1">
          <div className="mb-8 flex flex-wrap gap-2">
            <div className="lesson-shimmer h-3 w-20" />
            <div className="lesson-shimmer h-3 w-24" />
            <div className="lesson-shimmer h-3 w-32" />
          </div>
          <div className="lesson-shimmer mb-4 h-10 w-3/4" />
          <div className="lesson-shimmer mb-2 h-10 w-2/3" />
          <div className="lesson-shimmer mb-8 h-5 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="lesson-shimmer h-4" style={{ width: `${85 - (idx % 3) * 10}%` }} />
            ))}
          </div>
          <div className="mt-8 space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="lesson-shimmer h-4" style={{ width: `${90 - (idx % 4) * 8}%` }} />
            ))}
          </div>
        </div>
        <aside className="hidden lg:block lg:w-[240px] lg:shrink-0">
          <div className="space-y-2 pt-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="lesson-shimmer h-3" style={{ width: `${70 + idx * 5}%` }} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
