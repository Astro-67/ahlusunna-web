import type { LucideIcon } from 'lucide-react'

interface DashboardStatsProps {
  stats: Array<{
    label: string
    value: number
    icon: LucideIcon
    color: string
  }>
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-border bg-white p-6 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className={`flex size-12 items-center justify-center text-primary-foreground ${stat.color}`}>
              <stat.icon aria-hidden="true" size={24} />
            </div>
            <span className="text-[24px] font-bold text-foreground lg:text-[28px]">{stat.value}</span>
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
