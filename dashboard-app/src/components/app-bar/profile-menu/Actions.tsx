import Button from '@components/base/Button'
import Logout from '@components/app-bar/profile-menu/Logout'
import { DropdownMenuItem } from '@components/ui/dropdown-menu'
import { UserPenIcon, KeyRoundIcon } from 'lucide-react'
import type { MouseEventHandler } from 'react'

interface Props {
  onEditProfile: MouseEventHandler<HTMLButtonElement>
  onChangePassword: MouseEventHandler<HTMLButtonElement>
}

function ProfileMenuActions({ onEditProfile, onChangePassword }: Props) {
  return (
    <>
      <DropdownMenuItem className="p-0">
        <Button
          variant="ghost"
          className="w-full justify-start px-2"
          onClick={onEditProfile}>
          <UserPenIcon className="size-3" />
          Edit Profile
        </Button>
      </DropdownMenuItem>

      <DropdownMenuItem className="p-0">
        <Button
          variant="ghost"
          className="w-full justify-start px-2"
          onClick={onChangePassword}>
          <KeyRoundIcon className="size-3" />
          Change Password
        </Button>
      </DropdownMenuItem>

      <DropdownMenuItem className="p-0">
        <Logout className="w-full justify-start px-2" />
      </DropdownMenuItem>
    </>
  )
}

export default ProfileMenuActions
