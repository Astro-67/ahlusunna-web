import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import type { Language, TiptapDocument } from '#/types'

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

  return (
    <div
      className={
        language === 'ar'
          ? 'font-arabic mx-auto max-w-3xl py-8 text-right lg:py-12'
          : 'mx-auto max-w-3xl py-8 text-left font-sans lg:py-12'
      }
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  )
}
