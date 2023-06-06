import { Dashboard } from '@prisma/client'
import { DashboardCard } from './cards/DashboardCard'
import { CreateDashboard } from './CreateDashboard'

export interface DashboardListProps {
  dashboards: Dashboard[]
}

export function DashboardList({ dashboards }: DashboardListProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Dashboards ({dashboards.length})
      </h1>

      <CreateDashboard />

      <ul className="space-y-3">
        {dashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} data={dashboard} />
        ))}
      </ul>
    </div>
  )
}
