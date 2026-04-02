import { useState } from 'react'

import { Plus } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hub/ui'

import { useDashboardStore, widgetDefinitions } from '@features/dashboard-layout'
import { WidgetThumbnail } from '@entities/widget'

export function AddWidgetDialog() {
  const [open, setOpen] = useState(false)
  const addWidget = useDashboardStore((s) => s.addWidget)

  const handleSelect = (definitionId: string) => {
    addWidget(definitionId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          위젯 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>위젯 추가</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {widgetDefinitions.map((def) => (
            <WidgetThumbnail
              key={def.id}
              definition={def}
              onClick={() => handleSelect(def.id)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
