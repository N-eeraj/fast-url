import { createContext, type PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'

interface UserData {
  id: number
  name: string
  email: string
}

export const UserContext = createContext<{
  user?: UserData | null
  loadingUser: boolean
}>({
  user: null,
  loadingUser: false,
})

function UserContextProvider({ children }: PropsWithChildren) {
  const api = useApi()

  const {
    data,
    isLoading,
  } = useQuery<UserData | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api('/profile')
      if (
        response &&
        typeof response === "object" &&
        "data" in response
      ) {
        return response.data as UserData
      }
      return null
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

