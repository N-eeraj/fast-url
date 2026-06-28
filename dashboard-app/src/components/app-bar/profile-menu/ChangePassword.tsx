import Dialog from '@components/base/Dialog'
import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useChangePassword, { type Args } from '@hooks/profile/useChangePassword'

interface Props extends Args {}

function ChangePassword({ open, onClose }: Props) {
  const {
    register,
    errors,
    onSubmit,
    isSubmitting,
  } = useChangePassword({ open, onClose })

  return (
    <Dialog
      open={open}
      title="Change Password"
      description="Update your password"
      onOpenChange={onClose}>
      <form
        className="space-y-4"
        onSubmit={onSubmit}>
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter your current password"
          error={errors.password?.message}
          {...register("password")} />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          error={errors.newPassword?.message}
          {...register("newPassword")} />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")} />

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
            Update Password
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default ChangePassword
