import { useState } from 'react'
import { handleSuccess } from '@utils/toast'
import type { ShortUrl } from '@/types'

function useShortUrlCard({ short_code }: ShortUrl) {
  const origin = window.location.origin
  const shortenedUrl = `${origin}/${short_code}`

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortenedUrl)
    setCopied(true)
    handleSuccess('Copied URL to clipboard')

    setTimeout(() => setCopied(false), 1200)
  }

  const handleEdit = () => {
    console.log('handleEdit')
  }
  const handleToggleActiveStatus = () => {
    console.log('handleToggleActiveStatus')
  }

  return {
    shortenedUrl,
    copied,
    handleCopy,
    handleEdit,
    handleToggleActiveStatus,
  }
}

export default useShortUrlCard
