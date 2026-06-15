import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import api from '@utils/api'
import { handleSuccess, handleError } from '@utils/toast'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      return await api('/auth/login', {
        method: 'POST',
        body: payload,
      })
    },
    onSuccess: () => {
      handleSuccess('Login Successful')
    },
    onError: (error: unknown) => {
      handleError(error)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return {
    register,
    errors,
    onSubmit,
    isSubmitting: mutation.isPending,
  }
}

export default useLogin
