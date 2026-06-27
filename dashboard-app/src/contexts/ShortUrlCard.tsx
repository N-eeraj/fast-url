import { createContext, type PropsWithChildren } from 'react'
import useShortUrlCard from '@hooks/shortUrl/useShortUrlCard'
import type { ShortUrl } from '@/types'

type ShortUrlDataAndHook = ShortUrl & ReturnType<typeof useShortUrlCard>

interface ShortUrlContextType extends ShortUrlDataAndHook {
}

export const ShortUrlContext = createContext<ShortUrlContextType>(null)

type Props = PropsWithChildren & ShortUrl

function ShortUrlContextProvider({ children, ...shortUrl }: Props) {
  const shortUrlCardHook = useShortUrlCard(shortUrl)

  const values = {
    ...shortUrl,
    ...shortUrlCardHook,
  }

  return (
    <ShortUrlContext value={values}>
      {children}
    </ShortUrlContext>
  )
}

export default ShortUrlContextProvider
