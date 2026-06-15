import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import api from '@utils/api'
import { handleSuccess, handleError } from '@utils/toast'

const registerSchema = z
  .object({
    name: z.string()
      .min(2, 'Name is required'),
    email: z.email('Please enter a valid email address'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!@#$%^&*(),.?':{}|<>]/,
      'Must contain at least one special character'
    ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  )

export type RegisterFormValues = z.infer<typeof registerSchema>

function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const mutation = useMutation({
    mutationFn: async (payload: RegisterFormValues) => {
      return await api('/auth/register', {
        method: 'POST',
        body: payload,
      })
    },
    onSuccess: () => {
      handleSuccess('Registration Successful')
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

export default useRegister
