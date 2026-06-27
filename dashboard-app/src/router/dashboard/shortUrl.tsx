import React from 'react'
import { type RouteObject } from 'react-router'
import NotFound from '@pages/not-found'

const ViewShortUrl = React.lazy(() => import('@/pages/dashboard/short-url/[shortCode]'))

const shortUrlRoutes = [
  {
    path: 'short-url',
    children: [
      {
        index: true,
        Component: NotFound,
      },
      {
        path: ':shortCode',
        Component: ViewShortUrl,
      },
    ],
  },
] as Array<RouteObject>

export default shortUrlRoutes
