import ShortUrlAnalyticsContextProvider from '@contexts/ShortUrlAnalytics'
import AnalyticsFilter from '@components/short-url/analytics/Filter'
import TimeSeries from '@components/short-url/analytics/TimeSeries'

function ViewShortUrl() {
  return (
    <section>
      <ShortUrlAnalyticsContextProvider>
        <AnalyticsFilter />
        <TimeSeries />
      </ShortUrlAnalyticsContextProvider>
    </section>
  )
}

export default ViewShortUrl
