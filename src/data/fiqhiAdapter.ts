import type { MultilingualText } from '#/types'
import type {
  BreadcrumbModel,
  LessonReaderModel,
  MediaModel,
  PrevNextModel,
  SiblingModel,
} from '#/components/lesson-reader/types'

import fiqhiData from './fiqhi_mock_data.json'

interface RawLevel {
  id: string
  slug: string
  name_sw: string
  name_ar?: string
  name_en?: string
}

interface RawSubject {
  id: string
  slug: string
  name_sw: string
  name_ar?: string
  name_en?: string
}

interface RawMedia {
  id?: string
  type?: string
  url?: string
  source?: string
  title_sw?: string
  title_ar?: string
  title_en?: string
}

interface RawLesson {
  id: string
  slug: string
  order: number
  status?: string
  title_sw: string
  title_ar?: string
  title_en?: string
  body_sw: string
  body_ar?: string
  body_en?: string
  media?: RawMedia[]
  estimated_read_minutes?: number
}

interface RawSubtopic {
  id: string
  slug: string
  order: number
  name_sw: string
  name_ar?: string
  name_en?: string
  lessons: RawLesson[]
}

interface RawTopic {
  id: string
  slug: string
  order: number
  name_sw: string
  name_ar?: string
  name_en?: string
  subtopics: RawSubtopic[]
}

interface RawDocument {
  subject: RawSubject
  level: RawLevel
  topics: RawTopic[]
}

const data = fiqhiData as unknown as RawDocument

const trilingual = (sw: string, ar?: string, en?: string): MultilingualText => ({
  sw,
  ar: ar ?? sw,
  en: en ?? sw,
})

const normaliseStatus = (status?: string): LessonReaderModel['status'] => {
  switch ((status ?? '').toUpperCase()) {
    case 'PUBLISHED':
      return 'published'
    case 'DRAFT':
      return 'draft'
    case 'UNDER_REVIEW':
      return 'under_review'
    case 'ARCHIVED':
      return 'archived'
    default:
      return 'published'
  }
}

const normaliseMedia = (raw: RawMedia[] | undefined): MediaModel[] => {
  if (!raw || raw.length === 0) return []
  return raw
    .filter((item) => item.url && item.type)
    .map((item, idx) => {
      const upper = (item.type ?? '').toUpperCase()
      const kind = upper === 'AUDIO' ? 'AUDIO' : 'VIDEO_EMBED'
      return {
        id: item.id ?? `media-${idx}`,
        type: kind,
        url: item.url ?? '',
        source: item.source,
        title: trilingual(item.title_sw ?? '', item.title_ar, item.title_en),
      } satisfies MediaModel
    })
}

interface IndexedLesson {
  raw: RawLesson
  topic: RawTopic
  subtopic: RawSubtopic
  globalOrder: number
}

const lessonsBySlug = new Map<string, IndexedLesson>()
const orderedLessons: IndexedLesson[] = []

let runningOrder = 0
for (const topic of data.topics) {
  for (const subtopic of topic.subtopics) {
    for (const lesson of subtopic.lessons) {
      const indexed: IndexedLesson = {
        raw: lesson,
        topic,
        subtopic,
        globalOrder: runningOrder++,
      }
      lessonsBySlug.set(lesson.slug, indexed)
      orderedLessons.push(indexed)
    }
  }
}

const toModel = (indexed: IndexedLesson): LessonReaderModel => ({
  id: indexed.raw.id,
  slug: indexed.raw.slug,
  title: trilingual(indexed.raw.title_sw, indexed.raw.title_ar, indexed.raw.title_en),
  body: trilingual(indexed.raw.body_sw, indexed.raw.body_ar, indexed.raw.body_en),
  media: normaliseMedia(indexed.raw.media),
  estimatedReadMinutes: indexed.raw.estimated_read_minutes ?? 5,
  status: normaliseStatus(indexed.raw.status),
  levelId: 'awali' as LessonReaderModel['levelId'],
  source: 'fiqhi',
})

export const getFiqhiLessonModelBySlug = (slug: string): LessonReaderModel | null => {
  const indexed = lessonsBySlug.get(slug)
  return indexed ? toModel(indexed) : null
}

export const getFiqhiBreadcrumb = (slug: string): BreadcrumbModel | null => {
  const indexed = lessonsBySlug.get(slug)
  if (!indexed) return null
  const { topic, subtopic, raw } = indexed
  return {
    crumbs: [
      { label: trilingual(data.subject.name_sw, data.subject.name_ar, data.subject.name_en), to: '/subjects' },
      { label: trilingual(topic.name_sw, topic.name_ar, topic.name_en) },
      { label: trilingual(subtopic.name_sw, subtopic.name_ar, subtopic.name_en) },
      { label: trilingual(raw.title_sw, raw.title_ar, raw.title_en) },
    ],
  }
}

export const getFiqhiPrevNext = (slug: string): PrevNextModel => {
  const indexed = lessonsBySlug.get(slug)
  if (!indexed) return { prev: null, next: null }
  const idx = indexed.globalOrder
  const prev = idx > 0 ? orderedLessons[idx - 1] : null
  const next = idx < orderedLessons.length - 1 ? orderedLessons[idx + 1] : null
  return {
    prev: prev
      ? {
          slug: prev.raw.slug,
          title: trilingual(prev.raw.title_sw, prev.raw.title_ar, prev.raw.title_en),
        }
      : null,
    next: next
      ? {
          slug: next.raw.slug,
          title: trilingual(next.raw.title_sw, next.raw.title_ar, next.raw.title_en),
        }
      : null,
  }
}

export const getFiqhiSiblings = (slug: string): SiblingModel[] => {
  const indexed = lessonsBySlug.get(slug)
  if (!indexed) return []
  const siblings: SiblingModel[] = []
  for (const subtopic of indexed.topic.subtopics) {
    for (const lesson of subtopic.lessons) {
      if (lesson.slug === slug) continue
      const media = normaliseMedia(lesson.media)
      siblings.push({
        id: lesson.id,
        slug: lesson.slug,
        title: trilingual(lesson.title_sw, lesson.title_ar, lesson.title_en),
        estimatedReadMinutes: lesson.estimated_read_minutes ?? 5,
        mediaKinds: media.map((m) => m.type),
      })
    }
  }
  return siblings
}

export const isFiqhiSlug = (slug: string): boolean => lessonsBySlug.has(slug)

export const getFiqhiSubject = () =>
  trilingual(data.subject.name_sw, data.subject.name_ar, data.subject.name_en)
