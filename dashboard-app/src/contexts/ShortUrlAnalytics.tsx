import { createContext, type PropsWithChildren } from 'react'
import useShortUrlAnalytics from '@hooks/shortUrl/useShortUrlAnalytics'

type ShortUrlAnalyticsHook = ReturnType<typeof useShortUrlAnalytics>

export const ShortUrlAnalyticsContext = createContext<ShortUrlAnalyticsHook>(null)

function ShortUrlAnalyticsContextProvider({ children }: PropsWithChildren) {
  const shortUrlAnalyticsHook = useShortUrlAnalytics()

  return (
    <ShortUrlAnalyticsContext value={shortUrlAnalyticsHook}>
      {children}
    </ShortUrlAnalyticsContext>
  )
}

export default ShortUrlAnalyticsContextProvider
