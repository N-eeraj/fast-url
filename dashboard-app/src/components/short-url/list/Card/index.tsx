import ShortUrlContextProvider from '@contexts/ShortUrlCard'
import ShortUrlData from '@components/short-url/list/Card/Data'
import ToggleStatus from '@components/short-url/list/Card/ToggleStatus'
import type { ShortUrl } from '@/types'

function ShortUrlCard(shortUrl: ShortUrl) {
  return (
    <ShortUrlContextProvider {...shortUrl}>
      <ShortUrlData />
      <ToggleStatus />
    </ShortUrlContextProvider>
  )
}

export default ShortUrlCard
