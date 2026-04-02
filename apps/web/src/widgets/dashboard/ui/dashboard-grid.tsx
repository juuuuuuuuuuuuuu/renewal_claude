import { useEffect, useRef, useState } from 'react'

import { ResponsiveGridLayout, verticalCompactor } from 'react-grid-layout'

import { useDashboardStore } from '@features/dashboard-layout'
import type { DashboardLayouts } from '@features/dashboard-layout'

import { WidgetContainer } from './widget-container'

export function DashboardGrid() {
  const { widgets, layouts, updateLayouts, removeWidget } = useDashboardStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(1200)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) setContainerWidth(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (widgets.length === 0) {
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg text-muted-foreground"
      >
        <p className="text-sm">위젯이 없습니다.</p>
        <p className="text-xs mt-1">위젯 추가 버튼을 눌러 대시보드를 구성해 보세요.</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full">
      <ResponsiveGridLayout
        width={containerWidth}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 768, sm: 480 }}
        cols={{ lg: 12, md: 8, sm: 4 }}
        rowHeight={80}
        dragConfig={{ enabled: true, handle: '.widget-drag-handle' }}
        resizeConfig={{ handles: ['se'] }}
        compactor={verticalCompactor}
        onLayoutChange={(_layout, allLayouts) => {
          updateLayouts(allLayouts as DashboardLayouts)
        }}
      >
        {widgets.map((widget) => (
          <div key={widget.instanceId}>
            <WidgetContainer
              widget={widget}
              onRemove={() => removeWidget(widget.instanceId)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}
