import { Outlet } from 'react-router'
import UserContextProvider from '@/contexts/User'
import AppBar from '@components/AppBar'

function DashboardLayout() {
  return (
    <UserContextProvider>
      <AppBar />
      <main className="p-4">
        <Outlet />
      </main>
    </UserContextProvider>
  )
}

export default DashboardLayout
