import type { ComponentType } from 'react'

export interface WidgetProps {
  width?: number
  height?: number
}

export interface WidgetDefinition {
  id: string
  name: string
  description: string
  component: ComponentType<WidgetProps>
  defaultSize: { w: number; h: number }
  minSize: { w: number; h: number }
  maxSize?: { w: number; h: number }
}

export interface WidgetInstance {
  instanceId: string
  definitionId: string
}

export interface GridLayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
}

export interface DashboardLayouts {
  lg: GridLayoutItem[]
  md: GridLayoutItem[]
  sm: GridLayoutItem[]
}

export interface DashboardState {
  widgets: WidgetInstance[]
  layouts: DashboardLayouts
  addWidget: (definitionId: string) => void
  removeWidget: (instanceId: string) => void
  updateLayouts: (layouts: DashboardLayouts) => void
  resetToDefault: () => void
}
