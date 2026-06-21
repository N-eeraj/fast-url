import { toast } from 'sonner'

interface ErrorOptions {
  fallback?: string
  showToast?: boolean
}

export function handleSuccess(message: string) {
  toast.success(message)
}

export function handleError(
  error: Error | unknown,
  {
    fallback,
    showToast,
  }: ErrorOptions = {
    fallback: 'Oops! Something went wrong',
    showToast: false,
  },
) {
  if (
    error &&
    typeof error === 'object'
  ) {
    const showMessageToast = () => {
      if (
        'message' in error &&
        error.message &&
        typeof error.message === 'string'
      ) {
        toast.error(error.message || fallback)
      }
    }

    if (
      'errors' in error &&
      error.errors &&
      typeof error.errors === 'object'
    ) {
      if (showToast) {
        showMessageToast()
      }
      return error.errors
    }
    showMessageToast()
  }
}
