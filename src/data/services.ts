import type {
  Level,
  Subject,
  Course,
  Module,
  Lesson,
  Tag,
  User,
  AdminStats,
  LevelId,
  SubjectId,
} from '#/types'
import {
  levels,
  subjects,
  lessons,
} from '#/data/seed'
import { tags, users as mockUsers } from '#/data/mockData'

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
  getAll: (): Course[] => [],

  getById: (_id: string): Course | undefined => undefined,

  getBySlug: (_slug: string): Course | undefined => undefined,

  getBySubject: (_subjectId: SubjectId): Course[] => [],

  getByLevel: (_levelId: LevelId): Course[] => [],

  getFeatured: (_limit = 4): Course[] => [],
}

export const moduleService = {
  getAll: (): Module[] => [],

  getById: (_id: string): Module | undefined => undefined,

  getByCourse: (_courseId: string): Module[] => [],
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
  getStats: (): AdminStats => ({
    totalLessons: lessons.length,
    totalCourses: 0,
    totalSubjects: subjects.length,
    totalUsers: mockUsers.length,
    publishedLessons: lessons.filter(l => l.status === 'published').length,
    draftLessons: lessons.filter(l => l.status === 'draft').length,
    recentLessons: lessons.slice(0, 5),
  }),

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