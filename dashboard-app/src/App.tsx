import { RouterProvider } from 'react-router'
import router from '@router/index'
import QueryProvider from '@/QueryProvider'
import { ThemeProvider } from '@/contexts/Theme'
import '@assets/styles/index.css'

function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider storageKey="theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}

export default App
