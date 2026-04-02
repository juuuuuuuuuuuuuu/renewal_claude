import { X } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui'

import { getWidgetDefinition } from '@features/dashboard-layout'
import type { WidgetInstance } from '@features/dashboard-layout'

interface WidgetContainerProps {
  widget: WidgetInstance
  onRemove: () => void
}

export function WidgetContainer({ widget, onRemove }: WidgetContainerProps) {
  const definition = getWidgetDefinition(widget.definitionId)
  if (!definition) return null

  const Component = definition.component

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="widget-drag-handle flex-row items-center justify-between py-2 px-3 cursor-grab active:cursor-grabbing select-none shrink-0">
        <CardTitle className="text-sm font-medium">{definition.name}</CardTitle>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="위젯 삭제"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </CardHeader>
      <CardContent className="flex-1 p-2 pb-4 min-h-0">
        <Component />
      </CardContent>
    </Card>
  )
}
