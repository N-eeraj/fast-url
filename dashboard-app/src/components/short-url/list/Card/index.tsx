import ShortUrlContextProvider from '@contexts/ShortUrlCard'
import ShortUrlData from '@components/short-url/list/Card/Data'
import ToggleStatusConfirmation from '@components/short-url/list/Card/ToggleStatusConfirmation'
import DeleteConfirmation from '@components/short-url/list/Card/DeleteConfirmation'
import type { ShortUrl } from '@/types'

function ShortUrlCard(shortUrl: ShortUrl) {
  return (
    <ShortUrlContextProvider {...shortUrl}>
      <ShortUrlData />

      <ToggleStatusConfirmation />
      <DeleteConfirmation />
    </ShortUrlContextProvider>
  )
}

export default ShortUrlCard
