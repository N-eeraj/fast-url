import React from 'react'
import { type RouteObject } from 'react-router'
import NotFound from '@pages/not-found'

const ViewShortUrl = React.lazy(() => import('@/pages/dashboard/short-url/[id]'))

const shortUrlRoutes = [
  {
    path: 'shortUrls',
    children: [
      {
        index: true,
        Component: NotFound,
      },
      {
        path: ':id',
        Component: ViewShortUrl,
      },
    ],
  },
] as Array<RouteObject>

export default shortUrlRoutes
