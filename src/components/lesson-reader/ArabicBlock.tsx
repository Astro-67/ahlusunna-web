interface ArabicBlockProps {
  text: string
  citation?: string
}

export function ArabicBlock({ text, citation }: ArabicBlockProps) {
  return (
    <figure
      className="my-8"
      style={{
        background: '#F4EFE6',
        borderInlineStart: '4px solid #C9A84C',
        padding: '20px 24px',
        borderRadius: 0,
      }}
    >
      <p
        lang="ar"
        dir="rtl"
        className="font-arabic text-right"
        style={{ fontSize: '26px', lineHeight: '2.0', color: '#1B4332' }}
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
          className="mt-3 font-arabic text-[14px] font-medium leading-[1.6] text-accent/90 text-right"
        >
          {citation}
        </figcaption>
      )}
    </figure>
  )
}
