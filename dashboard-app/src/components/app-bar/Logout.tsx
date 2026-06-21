import Button from '@components/base/Button'
import useLogout from '@hooks/auth/useLogout'

function Logout() {
  const {
    loading,
    logout,
  } = useLogout()

  return (
    <Button
      variant="destructive"
      loading={loading}
      className="rounded-md text-sm"
      onClick={logout}>
      Logout
    </Button>
  )
}

export default Logout
