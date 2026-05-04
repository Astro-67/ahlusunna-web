import { cn } from '#/lib/utils'

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function BenefitCard({ icon, title, description, className }: BenefitCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden border border-[#E5E0D8] bg-white p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(27,67,50,0.1)]',
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-6 flex size-16 items-center justify-center border border-accent/20 bg-accent/5 md:size-20">
        <div className="text-accent">{icon}</div>
      </div>

      <h3 className="mb-3 font-decorative text-[22px] font-bold text-foreground">
        {title}
      </h3>

      <p className="text-[16px] leading-[1.75] text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
