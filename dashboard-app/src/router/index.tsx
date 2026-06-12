import { createBrowserRouter, Outlet } from 'react-router'
import authRoutes from '@router/auth'
import NotFound from '@pages/not-found'

const router = createBrowserRouter([
  {
    path: 'app',
    Component: Outlet,
    children: [
      ...authRoutes,
      {
        index: true,
        Component: NotFound,
      },
      {
        path: '*',
        Component: NotFound,
      }
    ],
  },
])

export default router
