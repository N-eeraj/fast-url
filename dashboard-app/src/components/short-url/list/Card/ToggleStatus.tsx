import { use } from 'react'
import Dialog from '@components/base/Dialog'
import Button from '@components/base/Button'
import { ShortUrlContext } from '@contexts/ShortUrlCard'

function ToggleStatus() {
  const {
    is_active,
    openToggleStatusConfirmation,
    setOpenToggleStatusConfirmation,
    toggleStatus,
  } = use(ShortUrlContext)

  const title = is_active ? 'Deactivate Short Link' : 'Activate Short Link'
  const description = is_active
    ? 'This short link will stop redirecting visitors until it is enabled again.'
    : 'This short link will become active and start redirecting visitors to its destination again.'

  const closeDialog = () => setOpenToggleStatusConfirmation(false)

  return (
    <Dialog
      open={openToggleStatusConfirmation}
      title={title}
      description={description}
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
          variant={is_active ? "destructive" : "default"}
          className="flex-1"
          onClick={() => toggleStatus()}>
          {is_active ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </Dialog>
  )
}

export default ToggleStatus
