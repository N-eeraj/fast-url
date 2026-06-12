import { createBrowserRouter, Outlet } from 'react-router'
import authRoutes from '@router/auth'
import dashboardRoutes from '@router/dashboard'
import NotFound from '@pages/not-found'

const router = createBrowserRouter([
  {
    path: 'app',
    Component: Outlet,
    children: [
      ...authRoutes,
      ...dashboardRoutes,
      {
        path: '*',
        Component: NotFound,
      }
    ],
  },
])

export default router
