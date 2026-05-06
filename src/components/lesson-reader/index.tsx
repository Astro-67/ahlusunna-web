import { useMemo } from 'react'

import { useLanguage } from '#/hooks/useLanguage'
import { Breadcrumb } from './Breadcrumb'
import { LessonBody } from './LessonBody'
import { LessonHeader } from './LessonHeader'
import { MediaBlock } from './MediaBlock'
import { parseLessonBody } from './parseLessonBody'
import { PrevNextNav } from './PrevNextNav'
import { RightRailTOC } from './RightRailTOC'
import { SiblingLessonsStrip } from './SiblingLessonsStrip'
import type {
  BreadcrumbModel,
  LessonReaderModel,
  PrevNextModel,
  SiblingModel,
} from './types'

interface LessonReaderProps {
  lesson: LessonReaderModel
  breadcrumb: BreadcrumbModel
  prevNext: PrevNextModel
  siblings: SiblingModel[]
  completionSlot?: React.ReactNode
}

export function LessonReader({
  lesson,
  breadcrumb,
  prevNext,
  siblings,
  completionSlot,
}: LessonReaderProps) {
  const { currentLang, t } = useLanguage()
  const [activeBody, isFallback] = useMemo(() => {
    const direct = lesson.body[currentLang]
    if (direct && direct.trim().length > 0) {
      return [direct, false] as const
    }
    return [lesson.body.sw ?? '', currentLang !== 'sw'] as const
  }, [lesson.body, currentLang])

  const parsed = useMemo(() => parseLessonBody(activeBody), [activeBody])

  const isRtl = currentLang === 'ar'
  const langAttr = currentLang

  return (
    <div className="bg-background">
      <div className="container-main py-8 lg:py-12">
        <Breadcrumb model={breadcrumb} />
      </div>

      <div className="container-main pb-16 lg:pb-24">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
          <article
            lang={langAttr}
            dir={isRtl ? 'rtl' : 'ltr'}
            className="mx-auto w-full max-w-[720px] flex-1"
          >
            <LessonHeader lesson={lesson} />

            {isFallback && (
              <p className="mt-6 border-l-4 border-l-accent bg-accent/5 px-4 py-2 text-[13px] text-muted-foreground" style={{ borderInlineStart: '4px solid var(--accent)', borderLeft: 'unset' }}>
                {t('lesson.fallback_lang_notice')}
              </p>
            )}

            {lesson.media.length > 0 && (
              <div className="mt-10">
                <MediaBlock media={lesson.media.filter((m) => m.type === 'VIDEO_EMBED')} />
              </div>
            )}

            <div className="mt-10">
              <LessonBody body={activeBody} />
            </div>

            {completionSlot && <div className="mt-10">{completionSlot}</div>}

            <div className="mt-10">
              <PrevNextNav model={prevNext} />
            </div>

            <SiblingLessonsStrip siblings={siblings} />
          </article>

          <RightRailTOC headings={parsed.headings} />
        </div>
      </div>

      {lesson.media.some((m) => m.type === 'AUDIO') && (
        <MediaBlock media={lesson.media.filter((m) => m.type === 'AUDIO')} />
      )}
    </div>
  )
}

export type { LessonReaderModel } from './types'
