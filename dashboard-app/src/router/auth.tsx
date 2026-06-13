import { type RouteObject } from 'react-router'
import AuthenticationLayout from '@layouts/authentication'
import Login from '@pages/auth/login'
import Register from '@pages/auth/register'

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
