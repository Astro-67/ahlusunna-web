import { useLanguage } from '#/hooks/useLanguage'

interface VideoEmbedProps {
  videoUrl: string
}

export function VideoEmbed({ videoUrl }: VideoEmbedProps) {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="aspect-video bg-foreground">
        <iframe
          src={videoUrl}
          title={t('lesson.video_title')}
          className="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
