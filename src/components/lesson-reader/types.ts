import type { Language, LevelId, MultilingualText } from '#/types'

export type MediaKind = 'AUDIO' | 'VIDEO_EMBED'

export interface MediaModel {
  id: string
  type: MediaKind
  url: string
  title?: MultilingualText
  source?: string
}

export interface BreadcrumbCrumb {
  label: MultilingualText
  to?: string
}

export interface BreadcrumbModel {
  crumbs: BreadcrumbCrumb[]
}

export interface SiblingModel {
  id: string
  slug: string
  title: MultilingualText
  estimatedReadMinutes: number
  mediaKinds: MediaKind[]
}

export interface PrevNextModel {
  prev?: { slug: string; title: MultilingualText } | null
  next?: { slug: string; title: MultilingualText } | null
}

export interface LessonReaderModel {
  id: string
  slug: string
  title: MultilingualText
  body: MultilingualText
  media: MediaModel[]
  estimatedReadMinutes: number
  status: 'published' | 'draft' | 'under_review' | 'archived'
  levelId: LevelId
  source: 'fiqhi' | 'seed'
}

export type ParagraphChild =
  | { kind: 'text'; text: string }
  | { kind: 'arabic'; text: string }
  | { kind: 'em'; text: string }
  | { kind: 'strong'; text: string }

export type BlockNode =
  | { type: 'paragraph'; children: ParagraphChild[] }
  | { type: 'heading'; id: string; text: string }
  | {
      type: 'arabicBlock'
      text: string
      citation?: string
    }
  | {
      type: 'numberedList'
      items: ParagraphChild[][]
    }
  | {
      type: 'bulletList'
      items: ParagraphChild[][]
    }

export interface ParsedBody {
  blocks: BlockNode[]
  headings: { id: string; text: string }[]
}

export type ReadingDirection = 'ltr' | 'rtl'

export type LessonLanguage = Language
