import { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { UserContext } from '@contexts/User'
import { queryClient } from '@/QueryProvider'
import { handleSuccess, handleError } from '@utils/toast'

const updateProfileSchema = z.object({
  name: z.string()
    .min(2, 'Please enter your name'),
  email: z.email('Please enter a valid email address'),
})

export type UpdateProfileFormValues = z.infer<
  typeof updateProfileSchema
>

function useUpdateProfile(open: boolean) {
  const { user } = use(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValues,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  })

  const api = useApi()

  const mutation = useMutation({
    mutationFn: async (
      payload: UpdateProfileFormValues,
    ) => {
      return await api('/profile', {
        method: 'PATCH',
        body: payload,
      })
    },
    onSuccess: () => {
      handleSuccess('Profile updated successfully')
      queryClient.invalidateQueries(
        {
          queryKey: ['user'],
        }
      )
    },
    onError: (error: unknown) => {
      const errors = handleError(error)

      if (errors) {
        Object.keys(errors).forEach((field) => {
          setError(
            field as keyof UpdateProfileFormValues,
            {
              message:
                errors[
                  field as keyof typeof errors
                ],
            },
          )
        })
      }
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  useEffect(() => {
    if (!user) return
    setValues(user)
  }, [
    user
  ])

  useEffect(() => {
    if (!(open && user)) return
    setValues(user, {
      shouldValidate: true,
    })
  }, [
    open,
  ])

  return {
    register,
    errors,
    onSubmit,
    isSubmitting: mutation.isPending,
  }
}

export default useUpdateProfile
