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
  ContentStatus,
  LessonStatus,
} from '#/types'
import {
  levels as mockLevels,
  subjects as mockSubjects,
  courses as mockCourses,
  modules as mockModules,
  lessons as mockLessons,
  tags as mockTags,
  users as mockUsers,
  adminStats as mockAdminStats,
} from '#/data/mockData'

export const levelService = {
  getAll: (): Level[] => mockLevels.filter(l => l.status === 'active'),

  getById: (id: LevelId): Level | undefined =>
    mockLevels.find(l => l.id === id),

  getBySlug: (slug: string): Level | undefined =>
    mockLevels.find(l => l.slug === slug),

  getPublicLevels: (): Level[] =>
    mockLevels.filter(l => l.isPublic && l.status === 'active'),
}

export const subjectService = {
  getAll: (): Subject[] => mockSubjects.filter(s => s.status === 'active'),

  getById: (id: SubjectId): Subject | undefined =>
    mockSubjects.find(s => s.id === id),

  getBySlug: (slug: string): Subject | undefined =>
    mockSubjects.find(s => s.slug === slug),

  getByLevel: (levelId: LevelId): Subject[] =>
    mockSubjects.filter(s => s.levelId === levelId && s.status === 'active'),
}

export const courseService = {
  getAll: (): Course[] => mockCourses.filter(c => c.status === 'active'),

  getById: (id: string): Course | undefined =>
    mockCourses.find(c => c.id === id),

  getBySlug: (slug: string): Course | undefined =>
    mockCourses.find(c => c.slug === slug),

  getBySubject: (subjectId: SubjectId): Course[] =>
    mockCourses.filter(c => c.subjectId === subjectId && c.status === 'active'),

  getByLevel: (levelId: LevelId): Course[] =>
    mockCourses.filter(c => c.levelId === levelId && c.status === 'active'),

  getFeatured: (limit = 4): Course[] =>
    mockCourses.filter(c => c.status === 'active').slice(0, limit),
}

export const moduleService = {
  getAll: (): Module[] => mockModules.filter(m => m.status === 'active'),

  getById: (id: string): Module | undefined =>
    mockModules.find(m => m.id === id),

  getByCourse: (courseId: string): Module[] =>
    mockModules.filter(m => m.courseId === courseId && m.status === 'active'),
}

export const lessonService = {
  getAll: (): Lesson[] => mockLessons.filter(l => l.status === 'published'),

  getById: (id: string): Lesson | undefined =>
    mockLessons.find(l => l.id === id),

  getBySlug: (slug: string): Lesson | undefined =>
    mockLessons.find(l => l.slug === slug),

  getBySubject: (subjectId: SubjectId): Lesson[] =>
    mockLessons.filter(l => l.subjectId === subjectId && l.status === 'published'),

  getByCourse: (courseId: string): Lesson[] =>
    mockLessons.filter(l => l.courseId === courseId && l.status === 'published'),

  getByLevel: (levelId: LevelId): Lesson[] =>
    mockLessons.filter(l => l.levelId === levelId && l.status === 'published'),

  getFeatured: (limit = 6): Lesson[] =>
    mockLessons
      .filter(l => l.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit),

  getLatest: (limit = 4): Lesson[] =>
    mockLessons
      .filter(l => l.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit),
}

export const tagService = {
  getAll: (): Tag[] => mockTags,

  getById: (id: string): Tag | undefined =>
    mockTags.find(t => t.id === id),

  getBySlug: (slug: string): Tag | undefined =>
    mockTags.find(t => t.slug === slug),

  getByType: (type: Tag['type']): Tag[] =>
    mockTags.filter(t => t.type === type),
}

export const userService = {
  getAll: (): User[] => mockUsers,

  getById: (id: string): User | undefined =>
    mockUsers.find(u => u.id === id),

  getByEmail: (email: string): User | undefined =>
    mockUsers.find(u => u.email === email),
}

export const adminService = {
  getStats: (): AdminStats => mockAdminStats,

  getRecentLessons: (limit = 5): Lesson[] =>
    mockLessons.slice(0, limit),
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
