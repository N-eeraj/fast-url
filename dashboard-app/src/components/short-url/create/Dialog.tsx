import React, { useEffect, useState } from 'react'
import Dialog from '@components/base/Dialog'
import CreateSuccess from '@components/short-url/create/Success'

const ShortUrlForm = React.lazy(() => import('@components/short-url/create/Form'))

interface Props {
  open: boolean
  onClose: () => void
}

function ShortUrlDialog({ open, onClose }: Props) {
  const [shortCode, setShortCode] = useState<string | null>(null)

  const title = shortCode ? 'Your short link is ready' : 'Shorten your URL'
  const description = shortCode
    ? 'Copy your shortened link below'
    : 'Paste a long URL and get a short link instantly'

  useEffect(() => {
    if (open) {
      setShortCode(null)
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
      {shortCode ? (
        <CreateSuccess shortCode={shortCode} />
      ) : (
        <ShortUrlForm
          onCancel={onClose}
          onSuccess={setShortCode} />
      )}
    </Dialog>
  )
}

export default ShortUrlDialog
