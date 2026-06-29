import { createContext, type PropsWithChildren } from 'react'
import useShortUrlAnalytics, { type Range } from '@hooks/shortUrl/useShortUrlAnalytics'

type ShortUrlAnalyticsHook = ReturnType<typeof useShortUrlAnalytics>

export const ShortUrlAnalyticsContext = createContext<ShortUrlAnalyticsHook>({
  dateOptions: [],
  from: null,
  to: null,
  isCustom: false,
  isLoadingTimeline: false,
  range: 'last_week',
  timeline: [],
  setCustomRange: (_from: string, _to: string) => {},
  setRange: (_range: Range) => {},
})

function ShortUrlAnalyticsContextProvider({ children }: PropsWithChildren) {
  const shortUrlAnalyticsHook = useShortUrlAnalytics()

  return (
    <ShortUrlAnalyticsContext value={shortUrlAnalyticsHook}>
      {children}
    </ShortUrlAnalyticsContext>
  )
}

export default ShortUrlAnalyticsContextProvider
