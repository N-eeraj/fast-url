import React, { Suspense, useState } from 'react'
import BaseButton from '@components/base/Button'
import { PlusIcon } from 'lucide-react'

const ShortUrlDialog = React.lazy(() => import('@components/short-url/create/Dialog'))

function CreateShortUrl() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BaseButton
        size="icon-lg"
        className="fixed bottom-4 right-4 size-fit p-2 rounded-full hover:rotate-90 hover:bg-primary"
        onClick={() => setOpen(true)}>
        <PlusIcon className="size-10" />
      </BaseButton>

      <Suspense>
        <ShortUrlDialog
          open={open}
          onClose={() => setOpen(false)} />
      </Suspense>
    </>
  )
}

export default CreateShortUrl
