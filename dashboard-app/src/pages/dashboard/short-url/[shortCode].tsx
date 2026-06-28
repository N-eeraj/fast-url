import ShortUrlAnalyticsContextProvider from '@contexts/ShortUrlAnalytics'
import AnalyticsFilter from '@components/short-url/analytics/Filter'

function ViewShortUrl() {
  return (
    <section>
      <ShortUrlAnalyticsContextProvider>
        <AnalyticsFilter />
      </ShortUrlAnalyticsContextProvider>
    </section>
  )
}

export default ViewShortUrl
