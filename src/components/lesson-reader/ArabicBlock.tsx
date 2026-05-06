interface ArabicBlockProps {
  text: string
  citation?: string
}

export function ArabicBlock({ text, citation }: ArabicBlockProps) {
  return (
    <figure
      className="my-8 border-l-4 border-l-accent bg-accent/5 px-6 py-5"
      style={{ borderInlineStart: '4px solid var(--accent)', borderLeft: 'unset' }}
    >
      <p
        lang="ar"
        dir="rtl"
        className="font-arabic text-[24px] font-bold leading-[2] text-foreground md:text-[26px]"
        style={{ fontSize: 'clamp(24px, 3.5vw, 28px)' }}
      >
        {text.split('\n').map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </p>
      {citation && (
        <figcaption
          dir="rtl"
          className="mt-3 font-arabic text-[14px] font-medium leading-[1.6] text-accent/90"
        >
          {citation}
        </figcaption>
      )}
    </figure>
  )
}
