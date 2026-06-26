import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { queryClient } from '@/QueryProvider'
import { handleError, toast } from '@utils/toast'

const createShortUrlSchema = z.object({
  url: z.url('Please enter a valid URL'),
})

export type CreateShortUrlFormValues = z.infer<typeof createShortUrlSchema>
export type Args = (arg: string) => void

function useCreateShortUrl(onSuccess: Args) {
  const api = useApi()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateShortUrlFormValues>({
    resolver: zodResolver(createShortUrlSchema),
    defaultValues: {
      url: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: CreateShortUrlFormValues) => {
      return await api('/short-urls', {
        method: 'POST',
        body: payload,
      })
    },

    onSuccess: (response: any) => {
      const shortCode = response?.data?.short_code
      if (!shortCode) {
        toast.error('Failed to shorten URL')
        return
      }

      onSuccess(shortCode)

      queryClient.invalidateQueries({
        queryKey: ['short-urls'],
      })
    },

    onError: (error: unknown) => {
      const errors = handleError(error)

      if (!errors) return

      Object.keys(errors).forEach((field) => {
        setError(field as keyof CreateShortUrlFormValues, {
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
    onSubmit,
    isSubmitting: mutation.isPending,
  }
}

export default useCreateShortUrl
