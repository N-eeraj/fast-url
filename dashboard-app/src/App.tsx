import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import router from '@router/index'
import QueryProvider from '@/QueryProvider'
import { ThemeProvider } from '@contexts/Theme'
import { Toaster } from '@components/ui/sonner'
import GlobalLoader from '@components/GlobalLoader'
import '@assets/styles/index.css'

function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider storageKey="theme">
          <Suspense fallback={<GlobalLoader />}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}

export default App
