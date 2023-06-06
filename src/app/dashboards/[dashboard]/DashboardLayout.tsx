'use client'

import { Widget } from '@/@types/widget'
import { api } from '@/api'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TrashIcon } from '@heroicons/react/outline'
import { Dashboard } from '@prisma/client'
import { useRef, useState } from 'react'
import ReactGridLayout, { Layout } from 'react-grid-layout'

import arrowPath from '@/assets/white-arrow-path.svg'
import Image from 'next/image'

// const GridLayout = WidthProvider(Responsive)

export interface DashboardLayoutProps {
  dashboard: Dashboard & { Widget: Widget[] }
  onAddWidget: (widget: Widget) => void
  onRemoveWidget: (widgetId: string) => void
  onUpdateWidgets: (widgets: Widget[]) => void
}

export function DashboardLayout({
  dashboard: { Widget: widgets, ...dashboard },
  onAddWidget,
  onRemoveWidget,
  onUpdateWidgets,
}: DashboardLayoutProps) {
  const [isSaved, setIsSaved] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const originalLayouts = widgets.map((widget) => ({ ...widget.layout }))
  const [layouts, setLayouts] = useState(originalLayouts)

  const [isDeleting, setIsDeleting] = useState(false)

  const isCancelled = useRef(false)
  const isAdding = useRef(false)
  const isFirstLayoutsUpdate = useRef(true)

  async function handleSave() {
    try {
      setIsSaving(true)

      const widgetsOfLayouts = layouts.map((layout) => {
        const widgetOfLayout = widgets.find((widget) => widget.key === layout.i)

        if (!widgetOfLayout) {
          throw new Error('Widget not found')
        }

        return {
          ...widgetOfLayout,
          layout,
        }
      })

      const { data } = await api.put('/widgets', widgetsOfLayouts)

      onUpdateWidgets(data)
    } catch {
    } finally {
      setIsSaving(false)
      setIsSaved(true)
    }
  }

  function handleCancel() {
    setLayouts(originalLayouts)
    setIsSaved(true)

    isCancelled.current = true
  }

  async function handleAddWidget() {
    const key = Math.random().toString()

    const { data } = await api.post('/widgets', {
      dashboardId: dashboard.id,
      key,
      layout: {
        i: key,
        x: 0,
        y: 0,
        w: 4,
        h: 4,
        minH: 3,
        minW: 3,
      },
    } as Omit<Widget, 'id'>)

    isAdding.current = true

    setLayouts((layouts) => [...layouts, data.layout])

    onAddWidget(data)
  }

  async function handleRemoveWidget(widgetId: string) {
    try {
      setIsDeleting(true)

      await api.delete(`/widgets/${widgetId}`)

      onRemoveWidget(widgetId)
    } catch {
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleUpdateWidgetLayouts(layouts: Layout[]) {
    if (isCancelled.current) {
      isCancelled.current = false
      return
    }

    if (isFirstLayoutsUpdate.current) {
      isFirstLayoutsUpdate.current = false
      return
    }

    if (isAdding.current) {
      isAdding.current = false
      return
    }

    setLayouts(layouts)
    setIsSaved(false)
  }

  return (
    <div>
      <DashboardHeader
        name={dashboard.name}
        hasChange={!isSaved}
        isSaving={isSaving}
        onCancel={handleCancel}
        onSave={handleSave}
        onAddWidget={handleAddWidget}
      />

      <div className="mt-4 rounded-lg p-3">
        {widgets.length === 0 && (
          <span className="inline-block w-full text-center text-lg opacity-60">
            Dashboard Vazio
          </span>
        )}

        <ReactGridLayout
          layout={layouts}
          cols={12}
          autoSize
          rowHeight={30}
          width={1200}
          isBounded
          onLayoutChange={handleUpdateWidgetLayouts}
        >
          {widgets.map((widget) => (
            <div
              key={widget.key}
              className="relative flex flex-col gap-1 rounded-md border border-zinc-100 bg-white p-4 shadow-md"
            >
              <span className="font-semibold">{widget.key}</span>
              <span className="text-sm opacity-50">{widget.id}</span>

              <button
                className="absolute right-2 top-2 rounded bg-red-400 p-1 hover:bg-red-500 active:bg-red-600 disabled:pointer-events-none disabled:opacity-40"
                onClick={() => handleRemoveWidget(widget.id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Image
                    src={arrowPath}
                    alt="Icon"
                    className="h-4 w-4 animate-spin"
                  />
                ) : (
                  <TrashIcon className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </div>
  )
}
