import React, { use } from 'react'
import Dialog from '@components/base/Dialog'
import { ShortUrlContext } from '@contexts/ShortUrlCard'
import { handleSuccess } from '@utils/toast'

const ShortUrlForm = React.lazy(() => import('@components/short-url/Form'))

function EditDialog() {
  const {
    openEditDialog,
    setOpenEditDialog,
    id,
    name,
    destination_url,
  } = use(ShortUrlContext)

  const defaultValues = {
    id,
    name,
    destination_url,
  }

  const handleUpdateSuccess = () => {
    handleSuccess('Updated Short URL')
    setOpenEditDialog(false)
  }

  return (
    <Dialog
      open={openEditDialog}
      title="Update Short URL"
      description="Update your short link's name and destination"
      onOpenChange={setOpenEditDialog}>
      <ShortUrlForm
        defaultValues={defaultValues}
        onCancel={() => setOpenEditDialog(false)}
        onSuccess={handleUpdateSuccess} />
    </Dialog>
  )
}

export default EditDialog
