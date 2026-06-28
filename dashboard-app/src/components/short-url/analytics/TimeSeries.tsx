import { use } from 'react'
import { ShortUrlAnalyticsContext } from '@contexts/ShortUrlAnalytics'

function TimeSeries() {
  const {
    isLoadingTimeline,
    timeline,
  } = use(ShortUrlAnalyticsContext)

  if (isLoadingTimeline) return "Loading..."

  return (
    <>
      {JSON.stringify(timeline)}
    </>
  )
}

export default TimeSeries
