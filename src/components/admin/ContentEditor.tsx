import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import {
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from 'lucide-react'

import type { Language, TiptapDocument } from '#/types'

const emptyDocument: TiptapDocument = {
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
}

interface ContentEditorProps {
  initialContent?: TiptapDocument
  onChange: (content: TiptapDocument) => void
  language: Language
}

export function ContentEditor({ initialContent, onChange, language }: ContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: language === 'ar' ? ['right', 'center', 'left'] : ['left', 'center', 'right'],
        defaultAlignment: language === 'ar' ? 'right' : 'left',
      }),
    ],
    content: initialContent ?? emptyDocument,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getJSON() as TiptapDocument)
    },
  })

  const toolbarButtons = [
    {
      label: 'Bold',
      icon: Bold,
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive('bold') ?? false,
    },
    {
      label: 'Italic',
      icon: Italic,
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive('italic') ?? false,
    },
    {
      label: 'Heading 2',
      icon: Heading1,
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive('heading', { level: 2 }) ?? false,
    },
    {
      label: 'Heading 3',
      icon: Heading2,
      action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor?.isActive('heading', { level: 3 }) ?? false,
    },
    {
      label: 'Quote',
      icon: Quote,
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editor?.isActive('blockquote') ?? false,
    },
    {
      label: 'Bullet list',
      icon: List,
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive('bulletList') ?? false,
    },
    {
      label: 'Ordered list',
      icon: ListOrdered,
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive('orderedList') ?? false,
    },
    {
      label: 'Align left',
      icon: AlignLeft,
      action: () => editor?.chain().focus().setTextAlign('left').run(),
      isActive: editor?.isActive({ textAlign: 'left' }) ?? false,
    },
    {
      label: 'Align right',
      icon: AlignRight,
      action: () => editor?.chain().focus().setTextAlign('right').run(),
      isActive: editor?.isActive({ textAlign: 'right' }) ?? false,
    },
    {
      label: 'Undo',
      icon: Undo,
      action: () => editor?.chain().focus().undo().run(),
      isActive: false,
    },
    {
      label: 'Redo',
      icon: Redo,
      action: () => editor?.chain().focus().redo().run(),
      isActive: false,
    },
  ]

  return (
    <div className="border border-border bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-background p-2">
        {toolbarButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={button.action}
            className={
              button.isActive
                ? 'flex size-8 items-center justify-center bg-primary text-primary-foreground transition-colors'
                : 'flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-white hover:text-foreground'
            }
            aria-label={button.label}
          >
            <button.icon aria-hidden="true" size={16} />
          </button>
        ))}
      </div>

      <div
        className={
          language === 'ar'
            ? 'font-arabic min-h-[360px] p-4 text-right'
            : 'min-h-[360px] p-4 text-left font-sans'
        }
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
