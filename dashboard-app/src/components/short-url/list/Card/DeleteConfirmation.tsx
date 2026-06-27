import { use } from 'react'
import Dialog from '@components/base/Dialog'
import Button from '@components/base/Button'
import { ShortUrlContext } from '@contexts/ShortUrlCard'

function DeleteConfirmation() {
  const {
    openDeleteConfirmation,
    setOpenDeleteConfirmation,
    deleteShortUrl,
  } = use(ShortUrlContext)

  const closeDialog = () => setOpenDeleteConfirmation(false)

  return (
    <Dialog
      open={openDeleteConfirmation}
      title="Delete Short URL"
      description="This action will permanently remove this short link. Visitors will no longer be redirected, and this cannot be undone."
      onOpenChange={closeDialog}>
      <div className="flex gap-x-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="destructive"
          className="flex-1"
          onClick={() => deleteShortUrl()}>
          Confirm Deletion
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteConfirmation
