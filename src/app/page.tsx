import { DashboardList } from '@/components/DashboardList'
import { NoDashboards } from '@/components/NoDashboards'
import { prisma } from '@/lib/database'

export default async function Home() {
  const dashboards = await prisma.dashboard.findMany({
    select: { id: true, name: true, Widget: true },
  })

  return (
    <div className="m-auto w-[80vw] text-center">
      {dashboards.length > 0 ? (
        <DashboardList dashboards={dashboards} />
      ) : (
        <NoDashboards />
      )}
    </div>
  )
}
