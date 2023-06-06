import { DashboardProvider } from './DashboardProvider'

export interface DashboardProps {
  params: {
    dashboard: string
  }
  searchParams: {}
}

export default function DashboardPage({ params }: DashboardProps) {
  return <DashboardProvider dashboardId={params.dashboard} />
}
