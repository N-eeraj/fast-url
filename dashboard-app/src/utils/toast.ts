import { toast } from 'sonner'

export function handleSuccess(message: string) {
  toast.success(message)
}

export function handleError(
  error: Error | unknown,
  fallback: string = 'Oops! Something went wrong'
) {
  let message = fallback
  if (
    error &&
    typeof error === 'object' &&
    'error' in error &&
    error.error &&
    typeof error.error === 'object' &&
    'message' in error.error &&
    typeof error.error.message === 'string'
  ) {
    message = error.error.message
  }
  toast.error(message)
}
