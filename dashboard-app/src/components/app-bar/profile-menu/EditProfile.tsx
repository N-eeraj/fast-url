import Dialog from '@components/base/Dialog'
import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useUpdateProfile from '@hooks/profile/useUpdateProfile'

interface Props {
  open: boolean
  onClose: () => void
}

function EditProfile({ open, onClose }: Props) {
  const {
    register,
    errors,
    onSubmit,
    isSubmitting,
  } = useUpdateProfile(open)

  return (
    <Dialog
      open={open}
      title="Edit Profile"
      description="Update your profile details"
      onOpenChange={onClose}>
      <form
        className="space-y-4"
        onSubmit={onSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex gap-x-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            className="flex-1"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            className="flex-1">
            Update Profile
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default EditProfile
