import { use, useState } from 'react'
import Button from '@components/base/Button'
import DropDown from '@components/base/DropDown'
import ProfileMenuActions from '@components/app-bar/profile-menu/Actions'
import { UserContext } from '@contexts/User'
import EditProfile from '@components/app-bar/profile-menu/EditProfile'
import ChangePassword from '@components/app-bar/profile-menu/ChangePassword'

function ProfileMenu() {
  const {
    user,
    loadingUser,
  } = use(UserContext)

  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)


  return (
    <>
      <DropDown
        content={(
          <ProfileMenuActions
            onEditProfile={() => setOpenEditProfile(true)}
            onChangePassword={() => setOpenChangePassword(true)} />
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

      <EditProfile
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)} />

      <ChangePassword
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)} />
    </>
  )
}

export default ProfileMenu
