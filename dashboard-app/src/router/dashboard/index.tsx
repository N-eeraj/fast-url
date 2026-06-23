import { type RouteObject } from 'react-router'
import DashboardLayout from '@layouts/dashboard'
import redirectRoutes from '@router/dashboard/redirects'
import Dashboard from '@pages/dashboard'

const dashboardRoutes = [
  {
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      ...redirectRoutes,
    ]
  },
] as Array<RouteObject>

export default dashboardRoutes
