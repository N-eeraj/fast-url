import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import { queryClient } from '@/QueryProvider'
import { handleSuccess, handleError } from '@utils/toast'
import type { ShortUrl } from '@/types'

function useShortUrlCard({ id, is_active, short_code }: ShortUrl) {
  const api = useApi()

  const origin = window.location.origin
  const shortenedUrl = `${origin}/${short_code}`

  const [copied, setCopied] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openToggleStatusConfirmation, setOpenToggleStatusConfirmation] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortenedUrl)
    setCopied(true)
    handleSuccess('Copied URL to clipboard')

    setTimeout(() => setCopied(false), 1200)
  }

  const {
    isPending: isTogglingStatus,
    mutate: toggleStatus,
  } = useMutation({
    mutationFn: async () => {
      setOpenToggleStatusConfirmation(false)
      return await api(`/short-urls/${id}/toggle-status`, {
        method: 'PATCH',
      })
    },
    onSuccess: (response) => {
      let message = 'Updated Short URL Successfully'
      if (
        response &&
        typeof response === 'object' &&
        'message' in response &&
        response.message &&
        typeof response.message === 'string'
      ) {
        message = response.message
      }
      handleSuccess(message)
      queryClient.invalidateQueries({
        queryKey: ['short-urls'],
      })
    },
    onError: (error: unknown) => {
      handleError(error, {
        showToast: true,
      })
    },
  })

  const {
    isPending: isDeleting,
    mutate: deleteShortUrl,
  } = useMutation({
    mutationFn: async () => {
      setOpenDeleteConfirmation(false)
      return await api(`/short-urls/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: (response) => {
      let message = 'Deleted Short URL Successfully'
      if (
        response &&
        typeof response === 'object' &&
        'message' in response &&
        response.message &&
        typeof response.message === 'string'
      ) {
        message = response.message
      }
      handleSuccess(message)
      queryClient.invalidateQueries({
        queryKey: ['short-urls'],
      })
    },
    onError: (error: unknown) => {
      handleError(error, {
        showToast: true,
      })
    },
  })

  let activeStatusText = is_active ? 'Active' : 'Inactive'
  if (isTogglingStatus) {
    activeStatusText = is_active ? 'Deactivating' : 'Activating'
  }

  return {
    shortenedUrl,
    activeStatusText,
    copied,
    openEditDialog,
    openToggleStatusConfirmation,
    openDeleteConfirmation,
    isTogglingStatus,
    isDeleting,
    handleCopy,
    setOpenEditDialog,
    setOpenToggleStatusConfirmation,
    setOpenDeleteConfirmation,
    toggleStatus,
    deleteShortUrl,
  }
}

export default useShortUrlCard
