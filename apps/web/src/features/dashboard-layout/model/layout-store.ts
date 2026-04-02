import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { DashboardLayouts, DashboardState, GridLayoutItem, WidgetInstance } from './types'
import { getWidgetDefinition } from './widget-registry'

const DEFAULT_WIDGETS: WidgetInstance[] = [
  { instanceId: 'default-1', definitionId: 'bar-chart' },
  { instanceId: 'default-2', definitionId: 'stat-card' },
  { instanceId: 'default-3', definitionId: 'line-chart' },
]

const DEFAULT_LAYOUTS: DashboardLayouts = {
  lg: [
    { i: 'default-1', x: 0, y: 0, w: 6, h: 3, minW: 2, minH: 2 },
    { i: 'default-2', x: 6, y: 0, w: 2, h: 2, minW: 2, minH: 1, maxW: 4, maxH: 2 },
    { i: 'default-3', x: 0, y: 3, w: 6, h: 3, minW: 2, minH: 2 },
  ],
  md: [
    { i: 'default-1', x: 0, y: 0, w: 5, h: 3, minW: 2, minH: 2 },
    { i: 'default-2', x: 5, y: 0, w: 2, h: 2, minW: 2, minH: 1, maxW: 4, maxH: 2 },
    { i: 'default-3', x: 0, y: 3, w: 5, h: 3, minW: 2, minH: 2 },
  ],
  sm: [
    { i: 'default-1', x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
    { i: 'default-2', x: 0, y: 3, w: 2, h: 2, minW: 2, minH: 1, maxW: 4, maxH: 2 },
    { i: 'default-3', x: 0, y: 5, w: 4, h: 3, minW: 2, minH: 2 },
  ],
}

function isValidState(data: unknown): data is { widgets: WidgetInstance[]; layouts: DashboardLayouts } {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return Array.isArray(d.widgets) && d.layouts !== null && typeof d.layouts === 'object'
}

function buildLayoutItem(instanceId: string, def: ReturnType<typeof getWidgetDefinition>, existingCount: number): GridLayoutItem {
  if (!def) return { i: instanceId, x: 0, y: Infinity, w: 4, h: 3 }
  const base: GridLayoutItem = {
    i: instanceId,
    x: (existingCount * def.defaultSize.w) % 12,
    y: Infinity,
    w: def.defaultSize.w,
    h: def.defaultSize.h,
    minW: def.minSize.w,
    minH: def.minSize.h,
  }
  if (def.maxSize) {
    base.maxW = def.maxSize.w
    base.maxH = def.maxSize.h
  }
  return base
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: DEFAULT_WIDGETS,
      layouts: DEFAULT_LAYOUTS,

      addWidget: (definitionId: string) => {
        const instanceId = nanoid()
        const def = getWidgetDefinition(definitionId)
        const { widgets, layouts } = get()

        const layoutItem = buildLayoutItem(instanceId, def, widgets.length)

        set({
          widgets: [...widgets, { instanceId, definitionId }],
          layouts: {
            lg: [...layouts.lg, layoutItem],
            md: [...layouts.md, { ...layoutItem, w: Math.min(layoutItem.w, 8) }],
            sm: [...layouts.sm, { ...layoutItem, x: 0, w: 4 }],
          },
        })
      },

      removeWidget: (instanceId: string) => {
        const { widgets, layouts } = get()
        set({
          widgets: widgets.filter((w) => w.instanceId !== instanceId),
          layouts: {
            lg: layouts.lg.filter((l) => l.i !== instanceId),
            md: layouts.md.filter((l) => l.i !== instanceId),
            sm: layouts.sm.filter((l) => l.i !== instanceId),
          },
        })
      },

      updateLayouts: (layouts: DashboardLayouts) => set({ layouts }),

      resetToDefault: () => set({ widgets: DEFAULT_WIDGETS, layouts: DEFAULT_LAYOUTS }),
    }),
    {
      name: 'dashboard-layout-v1',
      merge: (persisted, current) => {
        if (isValidState(persisted)) return { ...current, ...persisted }
        return current
      },
    }
  )
)
