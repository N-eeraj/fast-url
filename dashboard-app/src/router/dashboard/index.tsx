import React from 'react'
import { type RouteObject } from 'react-router'
import DashboardLayout from '@layouts/dashboard'
import shortUrlRoutes from '@router/dashboard/shortUrl'

const Dashboard = React.lazy(() => import('@pages/dashboard'))

const dashboardRoutes = [
  {
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      ...shortUrlRoutes,
    ]
  },
] as Array<RouteObject>

export default dashboardRoutes
