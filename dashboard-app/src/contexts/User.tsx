import { createContext, type PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'

export const UserContext = createContext({
  user: null,
  loadingUser: false,
})

function UserContextProvider({ children }: PropsWithChildren) {
  const api = useApi()

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api('/profile')
      if (
        response &&
        typeof response === "object" &&
        "data" in response
      ) {
        return response.data
      }
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

