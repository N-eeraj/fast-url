import { RouterProvider } from 'react-router'
import router from '@router/index'
import QueryProvider from '@/QueryProvider'
import { ThemeProvider } from '@/contexts/Theme'
import { Toaster } from '@components/ui/sonner'
import '@assets/styles/index.css'

function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider storageKey="theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}

export default App
