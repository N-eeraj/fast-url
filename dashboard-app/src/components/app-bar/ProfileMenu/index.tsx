import { use } from 'react'
import Button from '@components/base/Button'
import DropDown from '@components/base/DropDown'
import ProfileMenuActions from '@components/app-bar/ProfileMenu/Actions'
import { UserContext } from '@contexts/User'

function ProfileMenu() {
  const {
    user,
    loadingUser,
  } = use(UserContext)

  const handleEditProfileClick = () => {}
  const handleChangePasswordClick = () => {}

  return (
    <DropDown
      content={(
        <ProfileMenuActions
          onEditProfile={handleEditProfileClick}
          onChangePassword={handleChangePasswordClick} />
      )}
      contentProps={{
        align: "end",
        className: "min-w-42 py-1.5 space-y-0.75",
      }}>
      <Button
        variant="ghost"
        size="lg"
        disabled={loadingUser}
        className="rounded-md text-sm">
        {user?.name ?? "Profile"}
      </Button>
    </DropDown>
  )
}

export default ProfileMenu
