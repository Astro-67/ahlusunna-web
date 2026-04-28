import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ContentForm } from '#/components/admin/ContentForm'
import { Button } from '#/components/ui/button'
import { lessons as seedLessons, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import type { Lesson } from '#/types'

export function ContentManager() {
  const { t } = useLanguage()
  const [lessons, setLessons] = useState(seedLessons)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredLessons = lessons.filter((lesson) => {
    const normalizedQuery = searchQuery.toLowerCase()
    const matchesSearch =
      lesson.title.sw.toLowerCase().includes(normalizedQuery) ||
      lesson.title.ar.includes(searchQuery) ||
      lesson.title.en.toLowerCase().includes(normalizedQuery)
    const matchesSubject = selectedSubject === 'all' || lesson.subjectId === selectedSubject
    return matchesSearch && matchesSubject
  })

  const handleDelete = (lessonId: string) => {
    if (confirm(t('admin.delete_confirm'))) {
      setLessons((currentLessons) => currentLessons.filter((lesson) => lesson.id !== lessonId))
    }
  }

  const handleFormSubmit = (data: Partial<Lesson>) => {
    if (editingLesson) {
      setLessons((currentLessons) =>
        currentLessons.map((lesson) =>
          lesson.id === editingLesson.id ? ({ ...lesson, ...data }) : lesson,
        ),
      )
    } else {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title: data.title ?? { sw: '', ar: '', en: '' },
        slug: data.slug ?? '',
        subjectId: data.subjectId ?? 'quran',
        levelId: data.levelId ?? 'awali',
        order: lessons.length + 1,
        content: data.content ?? {
          sw: { type: 'doc', content: [] },
          ar: { type: 'doc', content: [] },
          en: { type: 'doc', content: [] },
        },
        videoUrl: data.videoUrl,
        audioSrc: data.audioSrc,
        audioType: 'lecture',
        duration: data.duration ?? '0:00',
        createdAt: new Date().toISOString().slice(0, 10),
      }
      setLessons((currentLessons) => [newLesson, ...currentLessons])
    }

    setIsFormOpen(false)
    setEditingLesson(null)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[24px] font-bold text-foreground lg:text-[28px]">
          {t('admin.content_manager')}
        </h2>
        <Button
          type="button"
          variant="accent"
          onClick={() => {
            setEditingLesson(null)
            setIsFormOpen(true)
          }}
        >
          <Plus data-icon="inline-start" />
          {t('admin.add_content')}
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search aria-hidden="true" size={20} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t('admin.search_content')}
            className="h-12 w-full border border-border bg-white px-4 ps-10 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(event) => setSelectedSubject(event.target.value)}
          className="h-12 border border-border bg-white px-4 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          aria-label={t('admin.subject')}
        >
          <option value="all">{t('admin.all_subjects')}</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name.sw}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="p-4 text-start text-sm font-medium text-muted-foreground">{t('admin.title')}</th>
              <th className="p-4 text-start text-sm font-medium text-muted-foreground">{t('admin.subject')}</th>
              <th className="p-4 text-start text-sm font-medium text-muted-foreground">{t('admin.level')}</th>
              <th className="p-4 text-start text-sm font-medium text-muted-foreground">{t('admin.type')}</th>
              <th className="p-4 text-end text-sm font-medium text-muted-foreground">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLessons.map((lesson) => {
              const subject = subjects.find((candidate) => candidate.id === lesson.subjectId)
              const contentTypes = [
                t('lesson.written_tab'),
                ...(lesson.videoUrl ? [t('lesson.video_tab')] : []),
                ...(lesson.audioSrc ? [t('lesson.audio_tab')] : []),
              ].join(', ')

              return (
                <tr key={lesson.id} className="transition-colors hover:bg-background">
                  <td className="p-4">
                    <p className="font-medium text-foreground">{lesson.title.sw}</p>
                    <p className="text-xs text-muted-foreground">{lesson.slug}</p>
                  </td>
                  <td className="p-4 text-sm">{subject?.name.sw}</td>
                  <td className="p-4">
                    <span className="bg-primary/10 px-2 py-1 text-xs text-primary">
                      {lesson.levelId}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{contentTypes}</td>
                  <td className="p-4 text-end">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLesson(lesson)
                          setIsFormOpen(true)
                        }}
                        className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-accent"
                        aria-label={t('admin.edit')}
                      >
                        <Pencil aria-hidden="true" size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(lesson.id)}
                        className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={t('admin.delete')}
                      >
                        <Trash2 aria-hidden="true" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredLessons.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">{t('admin.no_content')}</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" role="dialog" aria-modal="true" aria-labelledby="content-form-title">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white">
            <h2 id="content-form-title" className="sr-only">
              {t('admin.content_manager')}
            </h2>
            <ContentForm
              initialData={editingLesson ?? undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsFormOpen(false)
                setEditingLesson(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
