import React from 'react'
import { type RouteObject } from 'react-router'
import AuthenticationLayout from '@layouts/authentication'

const Login = React.lazy(() => import('@pages/auth/login'))
const Register = React.lazy(() => import('@pages/auth/register'))

const authRoutes = [
  {
    Component: AuthenticationLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
] as Array<RouteObject>

export default authRoutes
