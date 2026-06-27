import Button from '@components/base/Button'
import useLogout from '@hooks/auth/useLogout'
import { LogOutIcon } from 'lucide-react'
import clsx from 'clsx'

function Logout({ className = '' }) {
  const {
    disabled,
    loading,
    logout,
  } = useLogout()

  return (
    <Button
      variant="ghost"
      loading={loading}
      disabled={disabled}
      className={clsx(
        "rounded-md text-sm text-destructive! hover:text-destructive-foreground! bg-destructive/10 hover:bg-destructive!",
        className,
      )}
      onClick={logout}>
      <LogOutIcon className="size-3" />
      <span>
        Logout
      </span>
    </Button>
  )
}

export default Logout
