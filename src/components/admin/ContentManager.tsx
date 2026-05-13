import { Plus, Search, Pencil, Trash2, Video, FileAudio, FileText } from 'lucide-react'
import { useState } from 'react'

import { ContentForm } from '#/components/admin/ContentForm'
import { Button } from '#/components/ui/button'
import { lessons as seedLessons, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import { useAuth } from '#/hooks/useAuth'
import type { Lesson, LessonStatus } from '#/types'
import { cn } from '#/lib/utils'

export function ContentManager() {
  const { t, currentLang } = useLanguage()
  const { canPublishContent, canCreateContent } = useAuth()
  const [lessons, setLessons] = useState(seedLessons)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const isRtl = currentLang === 'ar'

  const filteredLessons = lessons.filter((lesson) => {
    const normalizedQuery = searchQuery.toLowerCase()
    const matchesSearch =
      lesson.title.sw.toLowerCase().includes(normalizedQuery) ||
      lesson.title.ar.includes(searchQuery) ||
      lesson.title.en.toLowerCase().includes(normalizedQuery)
    const matchesSubject = selectedSubject === 'all' || lesson.subjectId === selectedSubject
    const matchesStatus = selectedStatus === 'all' || lesson.status === selectedStatus
    return matchesSearch && matchesSubject && matchesStatus
  })

  const handleDelete = (lessonId: string) => {
    if (confirm(t('admin.delete_confirm'))) {
      setLessons((currentLessons) => currentLessons.filter((lesson) => lesson.id !== lessonId))
    }
  }

  const handleUpdateStatus = (lessonId: string, newStatus: LessonStatus) => {
    setLessons((currentLessons) =>
      currentLessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, status: newStatus } : lesson
      )
    )
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
        courseId: '',
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
        updatedAt: new Date().toISOString().slice(0, 10),
        status: data.status ?? 'draft',
        tags: []
      }
      setLessons((currentLessons) => [newLesson, ...currentLessons])
    }

    setIsFormOpen(false)
    setEditingLesson(null)
  }

  const StatusPill = ({ status }: { status: string }) => {
    let className = "inline-flex items-center gap-1.5 font-sans text-[11px] font-bold px-[9px] py-[3px] border tracking-[0.02em]"
    let label = status

    if (status === 'published' || status === 'active') {
      className += " bg-[#1B4332]/10 border-[#1B4332]/25 text-[#1B4332]"
      label = t('admin.status_published')
    } else if (status === 'draft') {
      className += " bg-background border-border text-muted-foreground"
      label = t('admin.status_draft')
    } else if (status === 'pending_review') {
      className += " bg-accent/10 border-accent/40 text-[#8a6f1f]"
      label = t('admin.status_review')
    } else if (status === 'needs_revision') {
      className += " bg-[#D97706]/10 border-[#D97706]/30 text-[#D97706]"
      label = t('admin.status_revision')
    } else if (status === 'archived') {
      className += " bg-[#9B2C2C]/10 border-[#9B2C2C]/30 text-[#9B2C2C]"
      label = t('admin.status_archived')
    }

    return <span className={className}>{label}</span>
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="mb-7 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.01em] text-foreground">{t('admin.content_manager_title')}</h1>
          <div className="mt-1 text-[13px] text-muted-foreground">{t('admin.content_manager_desc')}</div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-[280px]">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground size-[18px]", isRtl ? "right-3" : "left-3")} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t('admin.search_lessons')}
              className={cn("h-[38px] w-full bg-surface border border-border font-sans text-[13px] text-foreground focus:outline-none focus:border-primary", isRtl ? "pr-10 pl-3" : "pl-10 pr-3")}
            />
          </div>
          <Button
            type="button"
            variant="accent"
            className="h-[38px] px-5"
            disabled={!canCreateContent}
            title={canCreateContent ? t('admin.add_lesson') : 'Only authors can create lessons'}
            onClick={() => {
              setEditingLesson(null)
              setIsFormOpen(true)
            }}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">{t('admin.add_lesson')}</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-border pb-4">
        <select
          value={selectedSubject}
          onChange={(event) => setSelectedSubject(event.target.value)}
          className="h-[34px] border border-border bg-white px-3 text-[13px] text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">{t('admin.all_subjects_filter')}</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name[currentLang]}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="h-[34px] border border-border bg-white px-3 text-[13px] text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">{t('admin.all_status_filter')}</option>
          <option value="published">{t('admin.status_published')}</option>
          <option value="draft">{t('admin.status_draft')}</option>
          <option value="pending_review">{t('admin.status_review')}</option>
          <option value="needs_revision">{t('admin.status_revision')}</option>
          <option value="archived">{t('admin.status_archived')}</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-[800px] border-collapse text-left" dir={isRtl ? 'rtl' : 'ltr'}>
          <thead>
            <tr className="bg-[#FDFCF8]">
              <th className="p-[10px_18px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border text-start">{t('admin.title')} / URL</th>
              <th className="p-[10px_18px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border text-start">{t('admin.level')}</th>
              <th className="p-[10px_18px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border text-start">{t('admin.type')}</th>
              <th className="p-[10px_18px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border text-start">Vyombo</th>
              <th className="p-[10px_18px] text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-b border-border text-end">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => {
              const subject = subjects.find((candidate) => candidate.id === lesson.subjectId)

              return (
                <tr key={lesson.id} className="transition-colors hover:bg-[#FDFCF8] group border-b border-border last:border-b-0">
                  <td className="p-[14px_18px]">
                    <div className="font-semibold text-[13px] text-foreground">{lesson.title[currentLang] || lesson.title.en}</div>
                    <div className="text-[11px] text-muted-foreground mt-[2px]">{subject?.name[currentLang]} · {lesson.slug}</div>
                  </td>
                  <td className="p-[14px_18px] text-[13px] text-foreground capitalize">
                    {lesson.levelId}
                  </td>
                  <td className="p-[14px_18px]">
                    <StatusPill status={lesson.status || 'published'} />
                  </td>
                  <td className="p-[14px_18px]">
                    <div className="flex gap-1.5 text-muted-foreground">
                      {lesson.content && <FileText size={16} />}
                      {lesson.videoUrl && <Video size={16} />}
                      {lesson.audioSrc && <FileAudio size={16} />}
                    </div>
                  </td>
                  <td className="p-[14px_18px] text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canPublishContent && lesson.status !== 'published' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(lesson.id, 'published')}
                          className="flex h-[26px] items-center px-2 border border-border bg-white text-[11px] font-medium text-foreground hover:border-primary transition-colors"
                        >
                          {t('admin.publish_btn')}
                        </button>
                      )}
                      {canPublishContent && lesson.status === 'published' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(lesson.id, 'archived')}
                          className="flex h-[26px] items-center px-2 border border-border bg-white text-[11px] font-medium text-foreground hover:border-primary transition-colors"
                        >
                          {t('admin.archive_btn')}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLesson(lesson)
                          setIsFormOpen(true)
                        }}
                        className="flex size-7 items-center justify-center border border-transparent text-muted-foreground hover:border-border hover:bg-white hover:text-primary transition-colors"
                        title={t('admin.edit_lesson')}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(lesson.id)}
                        className="flex size-7 items-center justify-center border border-transparent text-muted-foreground hover:border-[#9B2C2C]/30 hover:bg-[#9B2C2C]/5 hover:text-[#9B2C2C] transition-colors"
                        title={t('admin.delete')}
                      >
                        <Trash2 size={14} />
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
            <p className="text-muted-foreground text-[13px]">{t('common.no_results')}</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white border border-border shadow-xl">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background">
              <h2 className="text-[16px] font-bold text-foreground">
                {editingLesson ? t('admin.edit_lesson') : t('admin.new_lesson')}
              </h2>
              <button onClick={() => { setIsFormOpen(false); setEditingLesson(null) }} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
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
