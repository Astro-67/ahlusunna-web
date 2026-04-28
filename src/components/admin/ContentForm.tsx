import { useState  } from 'react'
import type {FormEvent} from 'react';

import { Button } from '#/components/ui/button'
import { levels, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import type { Language, Lesson, LevelId, SubjectId, TiptapDocument } from '#/types'
import { ContentEditor } from './ContentEditor'

interface ContentFormProps {
  initialData?: Lesson
  onSubmit: (data: Partial<Lesson>) => void
  onCancel: () => void
}

const emptyDocument: TiptapDocument = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
}

export function ContentForm({ initialData, onSubmit, onCancel }: ContentFormProps) {
  const { t } = useLanguage()
  const [title, setTitle] = useState({
    sw: initialData?.title.sw ?? '',
    ar: initialData?.title.ar ?? '',
    en: initialData?.title.en ?? '',
  })
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [subjectId, setSubjectId] = useState<SubjectId>(initialData?.subjectId ?? 'quran')
  const [levelId, setLevelId] = useState<LevelId>(initialData?.levelId ?? 'awali')
  const [content, setContent] = useState({
    sw: initialData?.content.sw ?? emptyDocument,
    ar: initialData?.content.ar ?? emptyDocument,
    en: initialData?.content.en ?? emptyDocument,
  })
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? '')
  const [audioSrc, setAudioSrc] = useState(initialData?.audioSrc ?? '')
  const [duration, setDuration] = useState(initialData?.duration ?? '')
  const [activeTab, setActiveTab] = useState<Language>('sw')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      title,
      slug,
      subjectId,
      levelId,
      content,
      videoUrl: videoUrl || undefined,
      audioSrc: audioSrc || undefined,
      duration,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      <div>
        <div className="mb-4 flex border-b border-border">
          {(['sw', 'ar', 'en'] as const).map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => setActiveTab(language)}
              className={
                activeTab === language
                  ? 'bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors'
                  : 'bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {language === 'sw' ? 'Kiswahili' : language === 'ar' ? 'العربية' : 'English'}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={title[activeTab]}
          onChange={(event) => setTitle({ ...title, [activeTab]: event.target.value })}
          className={
            activeTab === 'ar'
              ? 'font-arabic h-12 w-full border border-border bg-background px-3 text-right text-foreground focus:border-2 focus:border-accent focus:outline-none'
              : 'h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none'
          }
          dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
          placeholder={activeTab === 'sw' ? t('admin.lesson_title') : activeTab === 'ar' ? 'عنوان الدرس' : 'Lesson title'}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="slug" className="text-sm font-medium text-foreground">
          {t('admin.slug')}
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          placeholder="jina-la-somo"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="subjectId" className="text-sm font-medium text-foreground">
            {t('admin.subject')}
          </label>
          <select
            id="subjectId"
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value as SubjectId)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name.sw}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="levelId" className="text-sm font-medium text-foreground">
            {t('admin.level')}
          </label>
          <select
            id="levelId"
            value={levelId}
            onChange={(event) => setLevelId(event.target.value as LevelId)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          >
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name.sw}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">{t('admin.content')}</label>
        <ContentEditor
          initialContent={content[activeTab]}
          onChange={(newContent) => setContent({ ...content, [activeTab]: newContent })}
          language={activeTab}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="videoUrl" className="text-sm font-medium text-foreground">
            {t('admin.video_url')}
          </label>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
            placeholder="https://youtube.com/embed/..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="audioSrc" className="text-sm font-medium text-foreground">
            {t('admin.audio_url')}
          </label>
          <input
            id="audioSrc"
            type="url"
            value={audioSrc}
            onChange={(event) => setAudioSrc(event.target.value)}
            className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="duration" className="text-sm font-medium text-foreground">
          {t('admin.duration')}
        </label>
        <input
          id="duration"
          type="text"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          className="h-12 w-full border border-border bg-background px-3 text-foreground focus:border-2 focus:border-accent focus:outline-none"
          placeholder="15:00"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit">{t('common.save')}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}
