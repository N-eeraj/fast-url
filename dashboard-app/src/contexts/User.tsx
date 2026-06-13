import { createContext, type PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import useApi from '@/utils/useApi'

export const UserContext = createContext({})

function UserContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const data = await useApi('/profile')
      } catch (error) {
        navigate('/app/login')
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

