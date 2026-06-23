import { type RouteObject } from 'react-router'
import CreateRedirect from '@pages/dashboard/redirect/create'
import ViewRedirect from '@pages/dashboard/redirect/[id]'
import NotFound from '@pages/not-found'

const redirectRoutes = [
  {
    path: 'redirects',
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
] as Array<RouteObject>

export default redirectRoutes
