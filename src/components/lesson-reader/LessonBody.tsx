import { useEffect, useMemo } from 'react'

import { ArabicBlock } from './ArabicBlock'
import { parseLessonBody } from './parseLessonBody'
import type { BlockNode, ParagraphChild, ParsedBody } from './types'

interface LessonBodyProps {
  body: string
  onParsed?: (parsed: ParsedBody) => void
}

const ParagraphChildren = ({ children }: { children: ParagraphChild[] }) => {
  return (
    <>
      {children.map((child, idx) => {
        if (child.kind === 'arabic') {
          return (
            <span
              key={idx}
              lang="ar"
              dir="rtl"
              className="font-arabic text-[1.05em] leading-[1.7] text-foreground"
            >
              {child.text}
            </span>
          )
        }
        return <span key={idx}>{child.text}</span>
      })}
    </>
  )
}

const Heading = ({ id, text }: { id: string; text: string }) => {
  return (
    <h3
      id={id}
      className="lesson-heading-fade font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.005em] text-primary uppercase"
      style={{ marginBlock: '32px 16px', letterSpacing: '0.02em' }}
    >
      {text}
    </h3>
  )
}

const NumberedList = ({ items }: { items: ParagraphChild[][] }) => (
  <ol className="my-6 flex flex-col gap-4">
    {items.map((item, idx) => (
      <li key={idx} className="flex gap-4 ps-1">
        <span
          aria-hidden="true"
          className="shrink-0 font-display text-[18px] font-bold leading-[1.7] text-accent"
          style={{ minWidth: '1.75rem' }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span className="text-[18px] leading-[1.7] text-foreground">
          <ParagraphChildren children={item} />
        </span>
      </li>
    ))}
  </ol>
)

const BulletList = ({ items }: { items: ParagraphChild[][] }) => (
  <ul className="my-6 flex flex-col gap-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex gap-3 ps-1">
        <span
          aria-hidden="true"
          className="mt-[0.65em] inline-block size-1.5 shrink-0 bg-accent"
        />
        <span className="text-[18px] leading-[1.7] text-foreground">
          <ParagraphChildren children={item} />
        </span>
      </li>
    ))}
  </ul>
)

const BlockRenderer = ({ block }: { block: BlockNode }) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="my-5 text-[18px] leading-[1.7] text-foreground">
          <ParagraphChildren children={block.children} />
        </p>
      )
    case 'heading':
      return <Heading id={block.id} text={block.text} />
    case 'arabicBlock':
      return <ArabicBlock text={block.text} citation={block.citation} />
    case 'numberedList':
      return <NumberedList items={block.items} />
    case 'bulletList':
      return <BulletList items={block.items} />
  }
}

export function LessonBody({ body, onParsed }: LessonBodyProps) {
  const parsed = useMemo(() => parseLessonBody(body), [body])

  useEffect(() => {
    onParsed?.(parsed)
  }, [parsed, onParsed])

  return (
    <div
      className="lesson-body-fade prose-none mx-auto max-w-[65ch] text-[18px] leading-[1.7] text-foreground"
      style={{ fontFeatureSettings: '"liga", "kern"' }}
    >
      {parsed.blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </div>
  )
}
