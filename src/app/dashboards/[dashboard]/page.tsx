'use client'

import { useRouter } from 'next/navigation'
import { DashboardLayout } from './DashboardLayout'
import { Widget } from '@/@types/widget'
import { useEffect, useState } from 'react'
import { Dashboard } from '@prisma/client'
import { api } from '@/api'

import arrowPath from '@/assets/arrow-path.svg'
import Image from 'next/image'

export interface DashboardProviderProps {
  params: { dashboard: string }
  searchParams: {}
}

export default function DashboardPage({ params }: DashboardProviderProps) {
  const { push } = useRouter()

  const [dashboard, setDashboard] = useState<
    (Dashboard & { Widget: Widget[] }) | null
  >(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/dashboards/${params.dashboard}`)

        setDashboard(data)
      } catch {
        push('/')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.dashboard, push])

  function handleAddWidget(widget: Widget) {
    console.log('CRIANDO:', widget)

    setDashboard((prevDashboard) => {
      if (!prevDashboard) {
        return prevDashboard
      }

      const updatedWidgets = [...prevDashboard.Widget, widget]
      const updatedDashboard = { ...prevDashboard, Widget: updatedWidgets }

      return updatedDashboard
    })
  }

  function handleUpdateWidgets(widgets: Widget[]) {
    setDashboard((prevDashboard) => {
      if (!prevDashboard) {
        return prevDashboard
      }

      const updatedDashboard = { ...prevDashboard, Widget: widgets }

      return updatedDashboard
    })
  }

  function handleRemoveWidget(widgetId: string) {
    setDashboard((prevDashboard) => {
      if (!prevDashboard) {
        return prevDashboard
      }

      const updatedWidgets = prevDashboard.Widget.filter(
        (widget) => widget.id !== widgetId,
      )
      const updatedDashboard = { ...prevDashboard, Widget: updatedWidgets }

      return updatedDashboard
    })
  }

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-1 opacity-50">
        <h1 className="text-lg font-semibold">Buscando Dashboard</h1>
        <Image src={arrowPath} alt="Icon" className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!dashboard) {
    push('/')

    return null
  }

  return (
    <div>
      <DashboardLayout
        dashboard={dashboard}
        onAddWidget={handleAddWidget}
        onRemoveWidget={handleRemoveWidget}
        onUpdateWidgets={handleUpdateWidgets}
      />
    </div>
  )
}
