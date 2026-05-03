import { BookOpen, FileText, Headphones, Play } from 'lucide-react'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

interface SubjectCardProps {
  subject: {
    id: string
    name: string
    nameAr?: string
    slug: string
    description: string
    icon: string
    lessonCount: number
  }
  featured?: boolean
  index?: number
  hasAudio?: boolean
  hasVideo?: boolean
}

export function SubjectCard({ subject, featured, index = 0, hasAudio = true, hasVideo = true }: SubjectCardProps) {
  const { t } = useLanguage()

  const formattedNum = String(index + 1).padStart(2, '0')

  return (
    <div className={cn(
      "group relative flex flex-col bg-white p-7 cursor-pointer transition-colors duration-200",
      "hover:bg-[#FDFCF8]"
    )}>
      {/* Featured Left Border */}
      {featured && (
        <div className="absolute left-0 top-0 h-full w-[3px] bg-accent" />
      )}

      {/* Number */}
      <span className="absolute right-6 top-5 text-[11px] font-bold tracking-widest text-[#1B4332]/20">
        {formattedNum}
      </span>

      {/* Icon Wrap */}
      <div className="mb-5 flex size-16 items-center justify-center bg-[#1B4332]/5 transition-colors duration-200 group-hover:bg-[#1B4332]/10">
        <BookOpen className="size-8 text-[#1B4332] transition-colors duration-200 group-hover:text-accent" strokeWidth={1.4} />
      </div>

      {/* Titles */}
      <div className="mb-1 text-[20px] font-bold tracking-tight text-foreground">
        {subject.name}
      </div>
      
      {subject.nameAr && (
        <div className="mb-3 font-arabic text-[17px] leading-[1.6] text-accent" dir="rtl">
          {subject.nameAr}
        </div>
      )}

      <div className="mb-5 flex-1 text-[13px] leading-[1.6] text-muted-foreground">
        {subject.description}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 border border-[#1B4332]/10 bg-[#1B4332]/5 px-2 py-1 text-[11px] font-medium text-primary">
            <FileText className="size-3" strokeWidth={2.5} />
            {subject.lessonCount} {t('navigation.lesson')}
          </span>
          {hasAudio && (
            <span className="flex items-center gap-1 border border-[#1B4332]/10 bg-[#1B4332]/5 px-2 py-1 text-[11px] font-medium text-primary">
              <Headphones className="size-3" strokeWidth={2.5} />
              Sauti
            </span>
          )}
          {hasVideo && (
            <span className="flex items-center gap-1 border border-[#1B4332]/10 bg-[#1B4332]/5 px-2 py-1 text-[11px] font-medium text-primary">
              <Play className="size-3" strokeWidth={2.5} />
              Video
            </span>
          )}
        </div>
        
        <div className="flex size-7 items-center justify-center bg-[#1B4332]/5 text-primary transition-transform duration-200 group-hover:translate-x-[3px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
