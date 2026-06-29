import { createContext, type PropsWithChildren } from 'react'
import useShortUrlCard from '@hooks/shortUrl/useShortUrlCard'
import type { ShortUrl } from '@/types'

type ShortUrlDataAndHook = ShortUrl & ReturnType<typeof useShortUrlCard>

interface ShortUrlContextType extends ShortUrlDataAndHook {
}

export const ShortUrlContext = createContext<ShortUrlContextType>({
  id: 0,
  name: '',
  destination_url: '',
  is_active: false,
  short_code: '',
  created_at: '',
  updated_at: '',
  shortenedUrl: '',
  activeStatusText: '',
  copied: false,
  openEditDialog: false,
  openToggleStatusConfirmation: false,
  openDeleteConfirmation: false,
  isTogglingStatus: false,
  isDeleting: false,
  handleCopy: async () => {},
  setOpenEditDialog: () => {},
  setOpenToggleStatusConfirmation: () => {},
  setOpenDeleteConfirmation: () => {},
  toggleStatus: () => {},
  deleteShortUrl: () => {},
})

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
