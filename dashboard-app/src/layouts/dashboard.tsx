import { Suspense } from 'react'
import { Outlet } from 'react-router'
import UserContextProvider from '@contexts/User'
import GlobalLoader from '@components/GlobalLoader'
import AppBar from '@components/app-bar'

function DashboardLayout() {
  return (
    <UserContextProvider>
      <AppBar />

      <main className="p-4">
        <Suspense fallback={<GlobalLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </UserContextProvider>
  )
}

export default DashboardLayout
