import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import { IslamicDivider } from '#/components/shared/IslamicPatterns'
import type { Language, TiptapDocument } from '#/types'
import { cn } from '#/lib/utils'

interface WrittenContentProps {
  content: TiptapDocument
  language: Language
}

export function WrittenContent({ content, language }: WrittenContentProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  })

  useEffect(() => {
    editor?.commands.setContent(content, { emitUpdate: false })
  }, [content, editor])

  const isRTL = language === 'ar'

  return (
    <div className="container-main">
      <div
        className={cn(
          'mx-auto max-w-3xl py-8 lg:py-12',
          isRTL ? 'text-right' : 'text-left',
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="mb-8">
          <IslamicDivider variant="ornate" />
        </div>

        <EditorContent
          editor={editor}
          className={cn(
            'prose max-w-none',
            'prose-headings:font-decorative prose-headings:text-foreground',
            'prose-p:text-body-lg prose-p:text-muted-foreground prose-p:leading-[1.8]',
            'prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:not-italic',
            'prose-blockquote:text-accent prose-blockquote:font-arabic prose-blockquote:text-2xl',
            language === 'ar' && 'prose-p:font-arabic prose-p:text-xl prose-p:leading-[2.2]',
          )}
        />

        <div className="mt-12">
          <IslamicDivider variant="ornate" />
        </div>
      </div>
    </div>
  )
}
