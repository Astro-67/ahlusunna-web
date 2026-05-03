import { useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '#/components/ui/button'
import { levels, subjects } from '#/data/seed'
import { useLanguage } from '#/hooks/useLanguage'
import type { Language, Lesson, LevelId, SubjectId, TiptapDocument, LessonStatus } from '#/types'
import { ContentEditor } from './ContentEditor'
import { UploadCloud, Link as LinkIcon, FileAudio } from 'lucide-react'
import { cn } from '#/lib/utils'

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
  const { t, currentLang } = useLanguage()
  const [title, setTitle] = useState({
    sw: initialData?.title.sw ?? '',
    ar: initialData?.title.ar ?? '',
    en: initialData?.title.en ?? '',
  })
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [subjectId, setSubjectId] = useState<SubjectId>(initialData?.subjectId ?? 'quran')
  const [levelId, setLevelId] = useState<LevelId>(initialData?.levelId ?? 'awali')
  const [status, setStatus] = useState<LessonStatus>(initialData?.status ?? 'draft')
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
      status,
    })
  }

  // Simulate file upload
  const handleAudioUploadClick = () => {
    const fakeUrl = `https://example.com/audio/upload-${Date.now()}.mp3`
    setAudioSrc(fakeUrl)
    if (!duration) setDuration('12:00') // fake duration
  }

  const isRtl = currentLang === 'ar'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pb-8 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_250px]">
        {/* Left Column: Metadata & Content */}
        <div className="flex flex-col gap-6 text-start">
          <div className="bg-white border border-border p-5">
            <h3 className="text-[13px] font-bold mb-4 uppercase tracking-[0.06em] text-muted-foreground border-b border-border pb-2">{t('admin.basic_info')}</h3>
            
            <div className="mb-5">
              <div className="mb-2 flex border-b border-border">
                {(['sw', 'ar', 'en'] as const).map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setActiveTab(language)}
                    className={
                      activeTab === language
                        ? 'border-b-2 border-primary px-4 py-2 text-[13px] font-bold text-primary transition-colors'
                        : 'border-b-2 border-transparent px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground'
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
                className={cn(
                  "h-[42px] w-full border border-border bg-background px-3 text-[14px] text-foreground focus:border-primary focus:bg-surface focus:outline-none",
                  activeTab === 'ar' ? 'font-arabic text-right' : 'font-sans'
                )}
                dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                placeholder={activeTab === 'sw' ? t('admin.lesson_title_label') : activeTab === 'ar' ? 'عنوان الدرس' : 'Lesson title'}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="slug" className="text-[12px] font-semibold text-foreground tracking-[0.02em]">
                  URL Slug <span className="text-accent">*</span>
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="h-[42px] w-full border border-border bg-background px-3 text-[13px] text-foreground focus:border-primary focus:bg-surface focus:outline-none"
                  placeholder="mfano: maana-ya-fatiha"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="duration" className="text-[12px] font-semibold text-foreground tracking-[0.02em]">
                  {t('lesson.duration')}
                </label>
                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="h-[42px] w-full border border-border bg-background px-3 text-[13px] text-foreground focus:border-primary focus:bg-surface focus:outline-none"
                  placeholder="mfano: 15:30"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-foreground">{t('admin.content')} ({activeTab.toUpperCase()})</label>
            <ContentEditor
              initialContent={content[activeTab]}
              onChange={(newContent) => setContent({ ...content, [activeTab]: newContent })}
              language={activeTab}
            />
          </div>
        </div>

        {/* Right Column: Settings & Media */}
        <div className="flex flex-col gap-6 text-start">
          <div className="bg-white border border-border p-5">
             <h3 className="text-[13px] font-bold mb-4 uppercase tracking-[0.06em] text-muted-foreground border-b border-border pb-2">{t('admin.publishing')}</h3>
             
             <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="status" className="text-[12px] font-semibold text-foreground tracking-[0.02em]">
                    {t('admin.subject')}
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value as LessonStatus)}
                    className="h-[42px] w-full border border-border bg-background px-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="draft">{t('admin.status_draft')}</option>
                    <option value="under_review">{t('admin.status_review')}</option>
                    <option value="published">{t('admin.status_published')}</option>
                    <option value="archived">{t('admin.status_archived')}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subjectId" className="text-[12px] font-semibold text-foreground tracking-[0.02em]">
                    {t('admin.subject')}
                  </label>
                  <select
                    id="subjectId"
                    value={subjectId}
                    onChange={(event) => setSubjectId(event.target.value as SubjectId)}
                    className="h-[42px] w-full border border-border bg-background px-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  >
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name[currentLang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="levelId" className="text-[12px] font-semibold text-foreground tracking-[0.02em]">
                    {t('admin.level')}
                  </label>
                  <select
                    id="levelId"
                    value={levelId}
                    onChange={(event) => setLevelId(event.target.value as LevelId)}
                    className="h-[42px] w-full border border-border bg-background px-3 text-[13px] text-foreground focus:border-primary focus:outline-none"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name[currentLang]}
                      </option>
                    ))}
                  </select>
                </div>
             </div>
          </div>

          <div className="bg-white border border-border p-5">
             <h3 className="text-[13px] font-bold mb-4 uppercase tracking-[0.06em] text-muted-foreground border-b border-border pb-2">{t('admin.media')}</h3>
             
             <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="videoUrl" className="text-[12px] font-semibold text-foreground tracking-[0.02em] flex items-center gap-1.5">
                    <LinkIcon size={14} /> URL ya Video (YouTube)
                  </label>
                  <input
                    id="videoUrl"
                    type="url"
                    value={videoUrl}
                    onChange={(event) => setVideoUrl(event.target.value)}
                    className="h-[42px] w-full border border-border bg-background px-3 text-[12px] text-foreground focus:border-primary focus:bg-surface focus:outline-none"
                    placeholder="https://youtube.com/embed/..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="audioSrc" className="text-[12px] font-semibold text-foreground tracking-[0.02em] flex items-center gap-1.5">
                    <FileAudio size={14} /> Faili la Sauti (MP3)
                  </label>
                  <input
                    id="audioSrc"
                    type="url"
                    value={audioSrc}
                    onChange={(event) => setAudioSrc(event.target.value)}
                    className="h-[42px] w-full border border-border bg-background px-3 text-[12px] text-foreground focus:border-primary focus:bg-surface focus:outline-none mb-2"
                    placeholder="https://..."
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-[12px] h-[34px] border-dashed border-[#ccc]"
                    onClick={handleAudioUploadClick}
                  >
                    <UploadCloud className="size-4 mr-2" /> {t('admin.upload_audio')}
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t border-border pt-6 mt-4">
        <Button type="submit" variant="accent" className="px-8">{t('admin.save_lesson_btn')}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}
