import type { Lesson, MultilingualText, TiptapDocument, TiptapNode } from '#/types'

import {
  getFiqhiBreadcrumb,
  getFiqhiLessonModelBySlug,
  getFiqhiPrevNext,
  getFiqhiSiblings,
  isFiqhiSlug,
} from './fiqhiAdapter'
import {
  getLessonBySlug,
  getLessonsBySubject,
  getSubjectById,
} from './seed'
import type {
  BreadcrumbModel,
  LessonReaderModel,
  MediaModel,
  PrevNextModel,
  SiblingModel,
} from '#/components/lesson-reader/types'

const tiptapToText = (doc: TiptapDocument | undefined): string => {
  if (!doc?.content) return ''
  const lines: string[] = []
  const walkInline = (nodes: TiptapNode[] | undefined): string => {
    if (!nodes) return ''
    return nodes
      .map((node) => {
        if (node.type === 'text') return node.text ?? ''
        if (node.content) return walkInline(node.content)
        return ''
      })
      .join('')
  }
  for (const node of doc.content) {
    if (node.type === 'heading') {
      const text = walkInline(node.content).trim()
      if (text) lines.push(`${text.toUpperCase()}:`, '')
    } else if (node.type === 'paragraph') {
      const text = walkInline(node.content).trim()
      if (text) lines.push(text, '')
    } else if (node.type === 'blockquote') {
      const text = walkInline(node.content).trim()
      if (text) lines.push(text, '')
    } else if (node.type === 'bulletList' || node.type === 'orderedList') {
      const ordered = node.type === 'orderedList'
      let idx = 1
      for (const item of node.content ?? []) {
        const text = walkInline(item.content).trim()
        if (!text) continue
        lines.push(ordered ? `${idx}. ${text}` : `- ${text}`)
        idx += 1
      }
      lines.push('')
    } else {
      const text = walkInline(node.content).trim()
      if (text) lines.push(text, '')
    }
  }
  return lines.join('\n').trim()
}

const seedToModel = (lesson: Lesson): LessonReaderModel => {
  const media: MediaModel[] = []
  if (lesson.videoUrl) {
    media.push({
      id: `${lesson.id}-video`,
      type: 'VIDEO_EMBED',
      url: lesson.videoUrl,
    })
  }
  if (lesson.audioSrc) {
    media.push({
      id: `${lesson.id}-audio`,
      type: 'AUDIO',
      url: lesson.audioSrc,
    })
  }
  const body: MultilingualText = {
    sw: tiptapToText(lesson.content.sw),
    ar: tiptapToText(lesson.content.ar),
    en: tiptapToText(lesson.content.en),
  }
  const minutes = (() => {
    const [m] = lesson.duration.split(':')
    const parsed = Number.parseInt(m || '5', 10)
    return parsed > 0 ? parsed : 5
  })()
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    body,
    media,
    estimatedReadMinutes: minutes,
    status: lesson.status,
    levelId: lesson.levelId,
    source: 'seed',
  }
}

export const getLessonModelBySlug = (slug: string): LessonReaderModel | null => {
  const fiqhi = getFiqhiLessonModelBySlug(slug)
  if (fiqhi) return fiqhi
  const seed = getLessonBySlug(slug)
  return seed ? seedToModel(seed) : null
}

export const getLessonBreadcrumb = (slug: string): BreadcrumbModel => {
  if (isFiqhiSlug(slug)) {
    return getFiqhiBreadcrumb(slug) ?? { crumbs: [] }
  }
  const lesson = getLessonBySlug(slug)
  if (!lesson) return { crumbs: [] }
  const subject = getSubjectById(lesson.subjectId)
  return {
    crumbs: [
      ...(subject ? [{ label: subject.name, to: '/subjects' }] : []),
      { label: lesson.title },
    ],
  }
}

export const getLessonPrevNext = (slug: string): PrevNextModel => {
  if (isFiqhiSlug(slug)) return getFiqhiPrevNext(slug)
  const lesson = getLessonBySlug(slug)
  if (!lesson) return { prev: null, next: null }
  const siblings = getLessonsBySubject(lesson.subjectId)
  const idx = siblings.findIndex((l) => l.id === lesson.id)
  const prev = idx > 0 ? siblings[idx - 1] : null
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  }
}

export const getLessonSiblings = (slug: string): SiblingModel[] => {
  if (isFiqhiSlug(slug)) return getFiqhiSiblings(slug)
  const lesson = getLessonBySlug(slug)
  if (!lesson) return []
  const siblings = getLessonsBySubject(lesson.subjectId)
  return siblings
    .filter((l) => l.id !== lesson.id)
    .map((l) => {
      const kinds: SiblingModel['mediaKinds'] = []
      if (l.videoUrl) kinds.push('VIDEO_EMBED')
      if (l.audioSrc) kinds.push('AUDIO')
      const minutes = (() => {
        const [m] = l.duration.split(':')
        const parsed = Number.parseInt(m || '5', 10)
        return parsed > 0 ? parsed : 5
      })()
      return {
        id: l.id,
        slug: l.slug,
        title: l.title,
        estimatedReadMinutes: minutes,
        mediaKinds: kinds,
      }
    })
}
