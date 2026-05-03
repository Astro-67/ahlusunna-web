export type Language = 'sw' | 'ar' | 'en'

export type ContentType = 'text' | 'video' | 'audio'

export type LevelId = 'beginner' | 'intermediate' | 'advanced'

export type SubjectId = 'quran' | 'hadith' | 'fiqh' | 'tawhid' | 'sirah'

export type UserRole = 'public' | 'learner' | 'moderator' | 'admin'

export type AudioType = 'lecture' | 'recitation'

export type LessonStatus = 'draft' | 'under_review' | 'published' | 'archived'

export type ContentStatus = 'active' | 'inactive'

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
  slug: string
  name: MultilingualText
  description: MultilingualText
  order: number
  isPublic: boolean
  status: ContentStatus
}

export interface Subject {
  id: SubjectId
  slug: string
  name: MultilingualText
  description: MultilingualText
  icon: string
  levelId: LevelId
  order: number
  status: ContentStatus
}

export interface Course {
  id: string
  slug: string
  title: MultilingualText
  description: MultilingualText
  subjectId: SubjectId
  levelId: LevelId
  order: number
  thumbnail?: string
  status: ContentStatus
}

export interface Module {
  id: string
  slug: string
  title: MultilingualText
  description: MultilingualText
  courseId: string
  order: number
  status: ContentStatus
}

export interface Lesson {
  id: string
  slug: string
  title: MultilingualText
  subjectId: SubjectId
  levelId: LevelId
  courseId: string
  moduleId?: string
  order: number
  content: MultilingualContent
  videoUrl?: string
  audioSrc?: string
  audioType?: AudioType
  duration: string
  thumbnail?: string
  status: LessonStatus
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  slug: string
  name: MultilingualText
  type: 'subject' | 'topic' | 'difficulty'
}

export interface Media {
  id: string
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  thumbnail?: string
  title: MultilingualText
  description?: MultilingualText
  duration?: number
  mimeType: string
  size: number
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  levelAccess: LevelId[]
  progress: string[]
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export interface AdminStats {
  totalLessons: number
  totalCourses: number
  totalSubjects: number
  totalUsers: number
  publishedLessons: number
  draftLessons: number
  recentLessons: Lesson[]
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
