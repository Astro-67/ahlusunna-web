import { useLanguage } from '#/hooks/useLanguage'
import { InPageAudioBar } from './InPageAudioBar'
import type { MediaModel } from './types'

interface MediaBlockProps {
  media: MediaModel[]
}

export function MediaBlock({ media }: MediaBlockProps) {
  const { currentLang } = useLanguage()
  if (media.length === 0) return null

  const videos = media.filter((m) => m.type === 'VIDEO_EMBED')
  const audios = media.filter((m) => m.type === 'AUDIO')

  return (
    <div className="flex flex-col gap-6">
      {videos.map((v) => (
        <figure key={v.id} className="flex flex-col gap-2">
          <div className="relative aspect-video w-full border border-primary bg-foreground">
            <iframe
              src={v.url}
              title={v.title?.[currentLang] ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          </div>
          {v.source && (
            <figcaption className="text-[12px] text-muted-foreground">
              {v.source}
            </figcaption>
          )}
        </figure>
      ))}

      {audios.map((a) => (
        <InPageAudioBar
          key={a.id}
          src={a.url}
          title={a.title?.[currentLang]}
        />
      ))}
    </div>
  )
}
