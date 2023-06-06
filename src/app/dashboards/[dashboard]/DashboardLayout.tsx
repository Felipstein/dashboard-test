'use client'

import { Widget } from '@/@types/widget'
import { api } from '@/api'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TrashIcon } from '@heroicons/react/outline'
import { Dashboard } from '@prisma/client'
import { useState } from 'react'
import ReactGridLayout from 'react-grid-layout'

import arrowPath from '@/assets/white-arrow-path.svg'
import Image from 'next/image'

// const GridLayout = WidthProvider(Responsive)

export interface DashboardLayoutProps {
  dashboard: Dashboard & { Widget: Widget[] }
  onAddWidget: (widget: Widget) => void
  onRemoveWidget: (widgetId: string) => void
}

export function DashboardLayout({
  dashboard: { Widget: widgets, ...dashboard },
  onAddWidget,
  onRemoveWidget,
}: DashboardLayoutProps) {
  const layouts = widgets.map((widget) => ({ ...widget.layout }))

  const [isDeleting, setIsDeleting] = useState(false)

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
        minH: 2,
        minW: 3,
      },
    } as Omit<Widget, 'id'>)

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

  return (
    <div>
      <DashboardHeader name={dashboard.name} onAddWidget={handleAddWidget} />

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
