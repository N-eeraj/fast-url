import { createContext, type PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'

export const UserContext = createContext({})

function UserContextProvider({ children }: PropsWithChildren) {
  const api = useApi()

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      await api('/profile')
    },
  })

  const values = {
    user: data,
    loadingUser: isLoading,
  }

  return (
    <UserContext value={values}>
      {children}
    </UserContext>
  )
}

export default UserContextProvider

