import { useQuery } from '@tanstack/react-query'
import { createContext, type PropsWithChildren } from 'react'

export const UserContext = createContext({})

function UserContextProvider({ children }: PropsWithChildren) {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      console.log("I'm called")
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

