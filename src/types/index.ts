export type Language = 'sw' | 'ar' | 'en'

export type ContentType = 'text' | 'video' | 'audio'

export type LevelId = 'awali' | 'kati' | 'endelea'

export type SubjectId = 'quran' | 'hadith' | 'fiqhi' | 'tawhidi' | 'sira'

export type UserRole = 'public' | 'learner' | 'admin'

export type AudioType = 'lecture' | 'recitation'

export interface MultilingualText {
  sw: string
  ar: string
  en: string
}

export interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  content?: TiptapNode[]
  text?: string
}

export interface TiptapDocument {
  type: 'doc'
  content: TiptapNode[]
}

export interface MultilingualContent {
  sw: TiptapDocument
  ar: TiptapDocument
  en: TiptapDocument
}

export interface Level {
  id: LevelId
  name: MultilingualText
  description: MultilingualText
  order: number
  isPublic: boolean
}

export interface Subject {
  id: SubjectId
  name: MultilingualText
  slug: string
  description: MultilingualText
  icon: string
  levelId: LevelId
  order: number
}

export interface Lesson {
  id: string
  title: MultilingualText
  slug: string
  subjectId: SubjectId
  levelId: LevelId
  order: number
  content: MultilingualContent
  videoUrl?: string
  audioSrc?: string
  audioType?: AudioType
  duration: string
  thumbnail?: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  levelAccess: LevelId[]
  progress: string[]
}

export interface AudioTrack {
  id: string
  title: string
  subject: string
  src: string
  type: AudioType
  duration: number
}

export type LessonTab = ContentType
