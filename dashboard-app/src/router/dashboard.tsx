import { Outlet, type RouteObject } from 'react-router'
import DashboardLayout from '@layouts/dashboard'
import Dashboard from '@pages/dashboard'
import Profile from '@pages/dashboard/profile'
import CreateRedirect from '@pages/dashboard/redirect/create'
import ViewRedirect from '@pages/dashboard/redirect/[id]'
import NotFound from '@pages/not-found'

const dashboardRoutes = [
  {
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'redirects',
        Component: Outlet,
        children: [
          {
            index: true,
            Component: NotFound,
          },
          {
            path: 'create',
            Component: CreateRedirect,
          },
          {
            path: ':id',
            Component: ViewRedirect,
          },
        ],
      },
    ]
  },
] as Array<RouteObject>

export default dashboardRoutes
