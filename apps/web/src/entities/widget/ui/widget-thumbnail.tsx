import { BarChart2, LineChart, PieChart, TrendingUp, Activity } from 'lucide-react'

import type { WidgetDefinition } from '@features/dashboard-layout'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'bar-chart': BarChart2,
  'line-chart': LineChart,
  'area-chart': Activity,
  'pie-chart': PieChart,
  'stat-card': TrendingUp,
}

interface WidgetThumbnailProps {
  definition: WidgetDefinition
  onClick: () => void
}

export function WidgetThumbnail({ definition, onClick }: WidgetThumbnailProps) {
  const Icon = ICON_MAP[definition.id] ?? BarChart2

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors text-left w-full"
    >
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-center">{definition.name}</p>
        <p className="text-xs text-muted-foreground text-center mt-0.5">{definition.description}</p>
      </div>
    </button>
  )
}
