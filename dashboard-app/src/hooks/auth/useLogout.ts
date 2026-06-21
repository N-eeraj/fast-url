import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { handleSuccess, handleError } from '@utils/toast'

function useLogout() {
  const api = useApi()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async () => {
      return await api('/auth/logout', {
        method: 'POST',
      })
    },
    onSuccess: () => {
      handleSuccess('Logout Successful')
      navigate({
        pathname: '/app/login',
      })
    },
    onError: (error: unknown) => {
      handleError(error, {
        showToast: true,
      })
    },
  })

  return {
    logout: () => mutation.mutate(),
    loading: mutation.isPending,
  }
}

export default useLogout
