import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { handleSuccess, handleError } from '@utils/toast'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Please enter your password'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const api = useApi()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      return await api('/auth/login', {
        method: 'POST',
        body: payload,
      })
    },
    onSuccess: () => {
      handleSuccess('Login Successful')
      navigate({
        pathname: '/app',
      })
    },
    onError: (error: unknown) => {
      const errors = handleError(error)
      if (errors) {
        Object.keys(errors)
          .forEach((field) => {
            setError(field as keyof LoginFormValues, {
              message: errors[field as keyof typeof errors],
            })
          })
      }
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
