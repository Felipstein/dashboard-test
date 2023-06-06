'use client'

import { TrashIcon } from '@heroicons/react/outline'
import { Dashboard } from '@prisma/client'
import Link from 'next/link'

export interface DashboardCardProps {
  data: Dashboard
}

export function DashboardCard({ data }: DashboardCardProps) {
  return (
    <Link
      href={`/dashboards/${data.id}`}
      className="flex items-center justify-between rounded-md border border-zinc-100 bg-white px-6 py-5 shadow ring-2 ring-transparent hover:bg-sky-50/20 hover:ring-sky-500"
    >
      <header className="flex flex-col items-start">
        <h3 className="font-semibold">{data.name}</h3>

        <span className="text-sm opacity-40">{data.id}</span>
      </header>

      <div>
        <button
          className="rounded bg-red-400 p-2 shadow-md shadow-red-100 transition-transform duration-100 hover:bg-red-500 hover:shadow-red-200 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
          disabled
        >
          <TrashIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </Link>
  )
}
