import React, { useEffect, useState } from 'react'
import Dialog from '@components/base/Dialog'
import CreateSuccess from '@components/short-url/create/Success'

const ShortUrlForm = React.lazy(() => import('@components/short-url/create/Form'))

interface Props {
  open: boolean
  onClose: () => void
}

function ShortUrlDialog({ open, onClose }: Props) {
  const [shortenedUrl, setShortenedUrl] = useState(null)

  const title = shortenedUrl ? 'Your short link is ready' : 'Shorten your URL'
  const description = shortenedUrl
    ? 'Copy your shortened link below'
    : 'Paste a long URL and get a short link instantly'

  useEffect(() => {
    if (open) {
      setShortenedUrl(null)
    }
  }, [
    open,
  ])

  return (
    <Dialog
      open={open}
      title={title}
      description={description}
      onOpenChange={onClose}>
      {shortenedUrl ? (
        <CreateSuccess shortenedUrl={shortenedUrl} />
      ) : (
        <ShortUrlForm
          onCancel={onClose}
          onSuccess={setShortenedUrl} />
      )}
    </Dialog>
  )
}

export default ShortUrlDialog
