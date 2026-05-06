import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  lessonService,
  subjectService,
  levelService,
  tagService,
  adminService,
  contactService,
  getLocalizedText,
} from '#/data/services'
import type { Language, LevelId, SubjectId } from '#/types'

// Query keys for cache management
export const queryKeys = {
  lessons: {
    all: ['lessons'] as const,
    list: (filters?: { levelId?: LevelId; subjectId?: SubjectId }) =>
      ['lessons', 'list', filters] as const,
    featured: (limit?: number) => ['lessons', 'featured', limit] as const,
    latest: (limit?: number) => ['lessons', 'latest', limit] as const,
    bySlug: (slug: string) => ['lessons', 'slug', slug] as const,
    bySubject: (subjectId: SubjectId) =>
      ['lessons', 'subject', subjectId] as const,
    byLevel: (levelId: LevelId) => ['lessons', 'level', levelId] as const,
  },
  subjects: {
    all: ['subjects'] as const,
    list: (levelId?: LevelId) => ['subjects', 'list', levelId] as const,
    bySlug: (slug: string) => ['subjects', 'slug', slug] as const,
    byLevel: (levelId: LevelId) => ['subjects', 'level', levelId] as const,
  },
  levels: {
    all: ['levels'] as const,
    public: ['levels', 'public'] as const,
    bySlug: (slug: string) => ['levels', 'slug', slug] as const,
  },
  tags: {
    all: ['tags'] as const,
    byType: (type: 'subject' | 'topic' | 'difficulty') =>
      ['tags', 'type', type] as const,
  },
  admin: {
    stats: ['admin', 'stats'] as const,
    recentLessons: (limit?: number) => ['admin', 'recentLessons', limit] as const,
  },
}

// Lesson queries
export function useLessons(filters?: { levelId?: LevelId; subjectId?: SubjectId }) {
  return useQuery({
    queryKey: queryKeys.lessons.list(filters),
    queryFn: () => {
      let result = lessonService.getAll()
      if (filters?.levelId) {
        result = result.filter((l) => l.levelId === filters.levelId)
      }
      if (filters?.subjectId) {
        result = result.filter((l) => l.subjectId === filters.subjectId)
      }
      return result
    },
    placeholderData: keepPreviousData,
  })
}

export function useFeaturedLessons(limit = 6) {
  return useQuery({
    queryKey: queryKeys.lessons.featured(limit),
    queryFn: () => lessonService.getFeatured(limit),
    placeholderData: keepPreviousData,
  })
}

export function useLatestLessons(limit = 4) {
  return useQuery({
    queryKey: queryKeys.lessons.latest(limit),
    queryFn: () => lessonService.getLatest(limit),
    placeholderData: keepPreviousData,
  })
}

export function useLessonBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.lessons.bySlug(slug),
    queryFn: () => lessonService.getBySlug(slug),
    enabled: Boolean(slug),
    placeholderData: keepPreviousData,
  })
}

export function useLessonsBySubject(subjectId: SubjectId) {
  return useQuery({
    queryKey: queryKeys.lessons.bySubject(subjectId),
    queryFn: () => lessonService.getBySubject(subjectId),
    placeholderData: keepPreviousData,
  })
}

export function useLessonsByLevel(levelId: LevelId) {
  return useQuery({
    queryKey: queryKeys.lessons.byLevel(levelId),
    queryFn: () => lessonService.getByLevel(levelId),
    placeholderData: keepPreviousData,
  })
}

// Subject queries
export function useSubjects(levelId?: LevelId) {
  return useQuery({
    queryKey: queryKeys.subjects.list(levelId),
    queryFn: () => {
      if (levelId) {
        return subjectService.getByLevel(levelId)
      }
      return subjectService.getAll()
    },
    placeholderData: keepPreviousData,
  })
}

export function useSubjectBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.subjects.bySlug(slug),
    queryFn: () => subjectService.getBySlug(slug),
    enabled: Boolean(slug),
    placeholderData: keepPreviousData,
  })
}

export function useSubjectsByLevel(levelId: LevelId) {
  return useQuery({
    queryKey: queryKeys.subjects.byLevel(levelId),
    queryFn: () => subjectService.getByLevel(levelId),
    placeholderData: keepPreviousData,
  })
}

// Level queries
export function useLevels() {
  return useQuery({
    queryKey: queryKeys.levels.all,
    queryFn: () => levelService.getAll(),
    placeholderData: keepPreviousData,
  })
}

export function usePublicLevels() {
  return useQuery({
    queryKey: queryKeys.levels.public,
    queryFn: () => levelService.getPublicLevels(),
    placeholderData: keepPreviousData,
  })
}

export function useLevelBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.levels.bySlug(slug),
    queryFn: () => levelService.getBySlug(slug),
    enabled: Boolean(slug),
    placeholderData: keepPreviousData,
  })
}

// Tag queries
export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: () => tagService.getAll(),
    placeholderData: keepPreviousData,
  })
}

export function useTagsByType(type: 'subject' | 'topic' | 'difficulty') {
  return useQuery({
    queryKey: queryKeys.tags.byType(type),
    queryFn: () => tagService.getByType(type),
    placeholderData: keepPreviousData,
  })
}

// Admin queries
export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats,
    queryFn: () => adminService.getStats(),
    placeholderData: keepPreviousData,
  })
}

export function useAdminRecentLessons(limit = 5) {
  return useQuery({
    queryKey: queryKeys.admin.recentLessons(limit),
    queryFn: () => adminService.getRecentLessons(limit),
    placeholderData: keepPreviousData,
  })
}

// Mutations
export function useSendContactMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: contactService.sendMessage,
    onSuccess: () => {
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['contact'] })
    },
  })
}

// Helper hook for localized content
export function useLocalizedData<T extends { name: { sw: string; en: string; ar: string } }>(
  data: T | undefined,
  language: Language,
) {
  if (!data) return null
  return getLocalizedText(data.name, language)
}

// Prefetch helpers for SSR
export function prefetchLesson(slug: string, queryClient: QueryClient) {
  queryClient.prefetchQuery({
    queryKey: queryKeys.lessons.bySlug(slug),
    queryFn: () => lessonService.getBySlug(slug),
  })
}

export function prefetchSubject(slug: string, queryClient: QueryClient) {
  queryClient.prefetchQuery({
    queryKey: queryKeys.subjects.bySlug(slug),
    queryFn: () => subjectService.getBySlug(slug),
  })
}