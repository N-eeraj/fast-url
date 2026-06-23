import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import useApi from '@hooks/useApi'
import { handleSuccess, handleError } from '@utils/toast'

const changePasswordSchema = z
  .object({
    currentPassword: z.string()
      .min(1, 'Please enter your current password'),
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!@#$%^&*(),.?':{}|<>]/, 'Must contain at least one special character'),
    confirmPassword: z.string()
      .min(1, 'Please confirm your new password'),
  })
    .refine(
      (data) => data.newPassword === data.confirmPassword,
      {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }
    )

export type ChangePasswordFormValues = z.infer<
  typeof changePasswordSchema
>

function useChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  })

  const api = useApi()

  const mutation = useMutation({
    mutationFn: async (
      payload: ChangePasswordFormValues,
    ) => {
      return await api('/profile/change-password', {
        method: 'PATCH',
        body: {
          currentPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        },
      })
    },

    onSuccess: () => {
      handleSuccess('Password changed successfully')
      reset()
    },

    onError: (error: unknown) => {
      const errors = handleError(error)

      if (errors) {
        Object.keys(errors).forEach((field) => {
          setError(
            field as keyof ChangePasswordFormValues,
            {
              message:
                errors[
                  field as keyof typeof errors
                ],
            }
          )
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

export default useChangePassword
