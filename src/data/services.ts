import type {
  Level,
  Subject,
  Course,
  Module,
  Lesson,
  User,
  AdminStats,
  LevelId,
  SubjectId,
} from '#/types'
import type { Tag } from '#/data/seed'
import {
  levels,
  subjects,
  lessons,
  courses,
  modules,
  tags,
  mockUsers,
  getAdminStats,
} from '#/data/seed'

export const levelService = {
  getAll: (): Level[] => levels.filter(l => l.status === 'active'),

  getById: (id: LevelId): Level | undefined =>
    levels.find(l => l.id === id),

  getBySlug: (slug: string): Level | undefined =>
    levels.find(l => l.slug === slug),

  getPublicLevels: (): Level[] =>
    levels.filter(l => l.isPublic && l.status === 'active'),
}

export const subjectService = {
  getAll: (): Subject[] => subjects.filter(s => s.status === 'active'),

  getById: (id: SubjectId): Subject | undefined =>
    subjects.find(s => s.id === id),

  getBySlug: (slug: string): Subject | undefined =>
    subjects.find(s => s.slug === slug),

  getByLevel: (levelId: LevelId): Subject[] =>
    subjects.filter(s => s.levelId === levelId && s.status === 'active'),
}

export const courseService = {
  getAll: (): Course[] => courses.filter(c => c.status === 'active'),

  getById: (id: string): Course | undefined =>
    courses.find(c => c.id === id),

  getBySlug: (slug: string): Course | undefined =>
    courses.find(c => c.slug === slug),

  getBySubject: (subjectId: SubjectId): Course[] =>
    courses.filter(c => c.subjectId === subjectId && c.status === 'active'),

  getByLevel: (levelId: LevelId): Course[] =>
    courses.filter(c => c.levelId === levelId && c.status === 'active'),

  getFeatured: (limit = 4): Course[] =>
    courses.filter(c => c.status === 'active').slice(0, limit),
}

export const moduleService = {
  getAll: (): Module[] => modules.filter(m => m.status === 'active'),

  getById: (id: string): Module | undefined =>
    modules.find(m => m.id === id),

  getByCourse: (courseId: string): Module[] =>
    modules.filter(m => m.courseId === courseId && m.status === 'active'),
}

export const lessonService = {
  getAll: (): Lesson[] => lessons.filter(l => l.status === 'published'),

  getById: (id: string): Lesson | undefined =>
    lessons.find(l => l.id === id),

  getBySlug: (slug: string): Lesson | undefined =>
    lessons.find(l => l.slug === slug),

  getBySubject: (subjectId: SubjectId): Lesson[] =>
    lessons.filter(l => l.subjectId === subjectId && l.status === 'published'),

  getByCourse: (courseId: string): Lesson[] =>
    lessons.filter(l => l.courseId === courseId && l.status === 'published'),

  getByLevel: (levelId: LevelId): Lesson[] =>
    lessons.filter(l => l.levelId === levelId && l.status === 'published'),

  getFeatured: (limit = 6): Lesson[] =>
    lessons
      .filter(l => l.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit),

  getLatest: (limit = 4): Lesson[] =>
    lessons
      .filter(l => l.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit),
}

export const tagService = {
  getAll: (): Tag[] => tags,

  getById: (id: string): Tag | undefined =>
    tags.find(t => t.id === id),

  getBySlug: (slug: string): Tag | undefined =>
    tags.find(t => t.slug === slug),

  getByType: (type: Tag['type']): Tag[] =>
    tags.filter(t => t.type === type),
}

export const userService = {
  getAll: (): User[] => mockUsers,

  getById: (id: string): User | undefined =>
    mockUsers.find(u => u.id === id),

  getByEmail: (email: string): User | undefined =>
    mockUsers.find(u => u.email === email),
}

export const adminService = {
  getStats: (): AdminStats => getAdminStats(),

  getRecentLessons: (limit = 5): Lesson[] =>
    lessons.slice(0, limit),
}

export const contactService = {
  sendMessage: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000))
  }
}

export const getLocalizedField = <T extends Record<string, unknown>>(
  item: T,
  fieldName: string,
  language: 'en' | 'sw' | 'ar'
): string => {
  const key = `${fieldName}_${language}` as keyof T
  const value = item[key]
  return typeof value === 'string' ? value : ''
}

export const getLocalizedText = (
  text: { en: string; sw: string; ar: string },
  language: 'en' | 'sw' | 'ar'
): string => text[language]