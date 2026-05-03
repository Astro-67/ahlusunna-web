import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Check, FileText, Headphones, PlayCircle } from 'lucide-react'

import {
  getLessonsBySubject,
  getSubjectBySlug,
  isLessonCompleted,
  subjects,
} from '#/data/seed'
import { useAuth } from '#/hooks/useAuth'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/(subjects)/subjects/$slug')({
  component: SubjectDetailPage,
})

function SubjectDetailPage() {
  const { slug } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentLang, t } = useLanguage()

  const subject = getSubjectBySlug(slug)
  const subjectLessons = subject ? getLessonsBySubject(subject.id) : []
  
  const completedLessons = subjectLessons.filter(l => isLessonCompleted(user, l.slug)).length
  const totalLessons = subjectLessons.length
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  const otherSubjects = subjects.filter(s => s.id !== subject?.id && s.levelId === subject?.levelId).slice(0, 3)

  if (!subject) {
    return (
      <div className="container-main py-16 text-center">
        <p className="text-muted-foreground">{t('subjects.not_found')}</p>
        <Link to="/subjects" className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <ArrowLeft className="size-4" />
          {t('navigation.subjects')}
        </Link>
      </div>
    )
  }

  // Find next lesson to continue
  const nextLesson = subjectLessons.find(l => !isLessonCompleted(user, l.slug)) || subjectLessons[0]

  return (
    <div className="bg-background flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-8 lg:px-12 lg:py-10">
        <div className="absolute inset-y-0 right-0 w-100 opacity-[0.06] pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geo2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="400" height="500" fill="url(#geo2)" />
          </svg>
        </div>

        <div className="container-main relative z-10">
          <div className="mb-6 flex items-center gap-1.5 text-xs text-[#FAF7F0]/55 font-medium">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-[#FAF7F0]/90">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              {t('navigation.home')}
            </Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <Link to="/subjects" className="transition-colors hover:text-[#FAF7F0]/90">{t('navigation.subjects')}</Link>
            <span className="text-[10px] text-[#FAF7F0]/25">›</span>
            <span className="text-[#FAF7F0]/85 font-semibold">{subject.name[currentLang]}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <div className="flex size-18 lg:size-22 shrink-0 items-center justify-center border border-[#FAF7F0]/20 bg-white/10">
              <BookOpen className="size-8 lg:size-10 text-[#FAF7F0]/80" strokeWidth={1.2} />
            </div>
            
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-baseline gap-4">
                <h1 className="text-[28px] lg:text-[30px] font-bold leading-tight tracking-[-0.02em] text-[#FAF7F0]">
                  {subject.name[currentLang]}
                </h1>
                <span className="font-arabic text-[20px] lg:text-[22px] text-accent" dir="rtl">
                  {subject.name.ar}
                </span>
              </div>
              
              <p className="mb-4 max-w-140 text-[14px] leading-[1.65] text-[#FAF7F0]/70">
                {subject.description[currentLang]}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5 border border-[#FAF7F0]/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#FAF7F0]/70">
                  <FileText className="size-3" strokeWidth={2.5} />
                  {totalLessons} masomo
                </span>
                <span className="flex items-center gap-1.5 border border-accent/30 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                  <Headphones className="size-3" strokeWidth={2.5} />
                  Sauti
                </span>
                <span className="flex items-center gap-1.5 border border-[#FAF7F0]/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#FAF7F0]/70">
                  <PlayCircle className="size-3" strokeWidth={2.5} />
                  Video
                </span>
                <div className="h-3.5 w-px bg-[#FAF7F0]/20 mx-1 hidden sm:block" />
                <span className="border border-[#FAF7F0]/15 px-2.5 py-1 text-[11px] font-medium text-[#FAF7F0]/55">
                  Hatua ya Awali
                </span>
              </div>

              {/* Progress */}
              <div className="mt-5 max-w-75">
                <div className="mb-1.5 flex justify-between text-[12px] text-[#FAF7F0]/60">
                  <span>Umefanya {completedLessons} / {totalLessons} masomo</span>
                  <span className="font-semibold text-accent">{progressPercent}%</span>
                </div>
                <div className="h-1 bg-white/15">
                  <div className="h-full bg-accent" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex shrink-0 items-start gap-2 md:mt-0">
              <Button asChild variant="outline" className="border-white/30 bg-transparent text-white/70 hover:bg-white/10 hover:text-white">
                <Link to="/subjects">← Nyuma</Link>
              </Button>
              <Button variant="accent" onClick={() => navigate({ to: '/lesson/$slug', params: { slug: nextLesson.slug } })}>
                Endelea →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="container-main flex flex-col lg:flex-row flex-1">
        {/* MAIN: Lessons List */}
        <div className="flex-1 border-r border-border p-6 lg:p-10 lg:px-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-foreground">Orodha ya Masomo</h2>
            <span className="text-[12px] text-muted-foreground">{totalLessons} masomo yote</span>
          </div>

          <div className="flex flex-col">
            {subjectLessons.length === 0 ? (
              <p className="text-muted-foreground py-4">{t('subjects.no_lessons')}</p>
            ) : (
              subjectLessons.map((lesson, index) => {
                const isCompleted = isLessonCompleted(user, lesson.slug)
                const isCurrent = !isCompleted && lesson.slug === nextLesson.slug
                const formattedNum = String(index + 1).padStart(2, '0')

                return (
                  <div
                    key={lesson.id}
                    onClick={() => navigate({ to: '/lesson/$slug', params: { slug: lesson.slug } })}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 border-b border-border py-4 transition-all duration-150",
                      isCurrent && "border-l-[3px] border-l-accent bg-[#1B4332]/5 -ml-0.75 pl-4.75 hover:bg-[#1B4332]/10",
                      !isCurrent && "hover:-mx-4 hover:px-4 hover:bg-[#FDFCF8]"
                    )}
                  >
                    {/* Number Circle */}
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="flex size-7.5 items-center justify-center rounded-full bg-primary">
                          <Check className="size-4 text-white" strokeWidth={3} />
                        </div>
                      ) : isCurrent ? (
                        <div className="flex size-7.5 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-foreground">
                          {formattedNum}
                        </div>
                      ) : (
                        <div className="flex size-7.5 items-center justify-center rounded-full border-[1.5px] border-border bg-background text-[11px] font-semibold text-[#aaa]">
                          {formattedNum}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "text-[14px]",
                        isCompleted && "font-medium text-[#aaa] line-through",
                        isCurrent && "font-bold text-primary",
                        !isCompleted && !isCurrent && "font-medium text-foreground"
                      )}>
                        {formattedNum}. {lesson.title[currentLang]}
                      </div>
                      <div className={cn(
                        "mt-0.5 text-[12px] leading-[1.4] line-clamp-1",
                        isCurrent ? "text-muted-foreground" : "text-[#bbb]"
                      )}>
                        {/* Fallback subtitle if no description exists on lesson in seed. */}
                        Soma na kuelewa maana ya {lesson.title[currentLang]}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="hidden sm:flex gap-1.5">
                        <div className={cn("flex size-5 items-center justify-center", isCurrent ? "bg-[#1B4332]/10" : "bg-[#1B4332]/5")}>
                          <FileText className="size-3 text-muted-foreground" strokeWidth={2} />
                        </div>
                        {lesson.audioSrc && (
                          <div className={cn("flex size-5 items-center justify-center", isCurrent ? "bg-[#1B4332]/10" : "bg-[#1B4332]/5")}>
                            <Headphones className="size-3 text-muted-foreground" strokeWidth={2} />
                          </div>
                        )}
                        {lesson.videoUrl && (
                          <div className={cn("flex size-5 items-center justify-center", isCurrent ? "bg-[#1B4332]/10" : "bg-[#1B4332]/5")}>
                            <PlayCircle className="size-3 text-muted-foreground" strokeWidth={2} />
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-[11px] whitespace-nowrap",
                        isCurrent ? "text-muted-foreground" : "text-[#bbb]"
                      )}>
                        {lesson.duration}
                      </span>
                      {isCurrent && (
                        <span className="bg-accent px-2 py-0.5 text-[10px] font-bold tracking-[0.04em] text-foreground hidden md:inline-block">
                          Endelea
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* SIDEBAR: Widgets */}
        <div className="w-full lg:w-68 shrink-0 bg-[#FDFCF8] p-6 py-10 lg:p-9 lg:px-6">
          
          <div className="mb-8">
            <h3 className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Kuhusu Somo Hili</h3>
            <p className="text-[13px] leading-[1.65] text-muted-foreground">
              {subject.description[currentLang]}
            </p>
          </div>

          {otherSubjects.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Masomo Mengine</h3>
              <div className="flex flex-col gap-2">
                {otherSubjects.map(other => {
                  const otherCount = getLessonsBySubject(other.id).length
                  return (
                    <div 
                      key={other.id} 
                      onClick={() => navigate({ to: '/subjects/$slug', params: { slug: other.slug } })}
                      className="flex cursor-pointer items-center gap-3 border border-border bg-white p-3 transition-colors duration-150 hover:border-primary"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center bg-[#1B4332]/5">
                        <BookOpen className="size-4 text-primary" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-[13px] font-semibold text-foreground">{other.name[currentLang]}</div>
                        <div className="text-[11px] text-muted-foreground">{otherCount} masomo</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" className="shrink-0">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
