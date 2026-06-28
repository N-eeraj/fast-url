import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { queryClient } from '@/QueryProvider'
import { handleError, toast } from '@utils/toast'

const shortUrlSchema = z.object({
  name: z.string('Please enter a name to identify this URL'),
  destination_url: z.url('Please enter a valid URL'),
})

export type ShortUrlFormValues = z.infer<typeof shortUrlSchema>
export type OnSuccess = (arg: string) => void
export type DefaultValues = ShortUrlFormValues & {
  id: number,
}

function useShortUrlForm(
  onSuccess: OnSuccess,
  defaultValues: DefaultValues,
) {
  const api = useApi()

  const isUpdate = Boolean(defaultValues?.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ShortUrlFormValues>({
    resolver: zodResolver(shortUrlSchema),
    defaultValues: defaultValues ?? {
      name: '',
      destination_url: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: ShortUrlFormValues) => {
      const endpoint = isUpdate ? `/short-urls/${defaultValues.id}` : '/short-urls'
      const method = isUpdate ? 'PATCH' : 'POST'

      return await api(endpoint, {
        method,
        body: payload,
      })
    },

    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: ['short-urls'],
      })

      const shortCode = response?.data?.short_code

      onSuccess(shortCode)

      if (isUpdate) return
      if (!shortCode) {
        toast.error('Failed to shorten URL')
        return
      }
    },

    onError: (error: unknown) => {
      const errors = handleError(error)

      if (!errors) return

      Object.keys(errors).forEach((field) => {
        setError(field as keyof ShortUrlFormValues, {
          message: errors[field as keyof typeof errors],
        })
      })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return {
    register,
    errors,
    isUpdate,
    onSubmit,
    isSubmitting: mutation.isPending,
  }
}

export default useShortUrlForm
