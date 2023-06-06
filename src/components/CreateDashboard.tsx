'use client'

import { api } from '@/api'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Dashboard } from '@prisma/client'
import { useRouter } from 'next/navigation'

export function CreateDashboard() {
  const { push } = useRouter()

  async function createNewDashboard() {
    const response = await api.post<Dashboard>('/dashboards', {
      name: 'Sem Título',
    })

    return push(`/dashboards/${response.data.id}`)
  }

  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={createNewDashboard}
    >
      <PlusCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Criar um novo Dashboard
      </span>
    </button>
  )
}
