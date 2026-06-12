import { Outlet } from 'react-router'
import UserContextProvider from '@/contexts/User'
import AppBar from '@components/AppBar'

function DashboardLayout() {
  return (
    <UserContextProvider>
      <main>
        <AppBar />
        <Outlet />
      </main>
    </UserContextProvider>
  )
}

export default DashboardLayout
