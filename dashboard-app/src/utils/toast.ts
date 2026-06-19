import { toast } from 'sonner'

export function handleSuccess(message: string) {
  toast.success(message)
}

export function handleError(
  error: Error | unknown,
  fallback: string = 'Oops! Something went wrong'
) {
  if (
    error &&
    typeof error === 'object'
  ) {
    if (
      'errors' in error &&
      error.errors &&
      typeof error.errors === 'object'
    ) {
      return error.errors
    }
    if (
      'message' in error &&
      error.message &&
      typeof error.message === 'string'
    ) {
      toast.error(error.message || fallback)
    }
  }
}
