import React from 'react'
import { type RouteObject } from 'react-router'
import NotFound from '@pages/not-found'

const ViewRedirect = React.lazy(() => import('@pages/dashboard/redirect/[id]'))

const redirectRoutes = [
  {
    path: 'redirects',
    children: [
      {
        index: true,
        Component: NotFound,
      },
      {
        path: ':id',
        Component: ViewRedirect,
      },
    ],
  },
] as Array<RouteObject>

export default redirectRoutes
