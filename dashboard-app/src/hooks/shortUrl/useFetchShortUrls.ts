import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import type { ShortUrl } from '@/types'

function useFetchShortUrls() {
  const api = useApi()

  const [searchParams, _setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const search = searchParams.get('search') ?? ''
  const limit = Number(searchParams.get('limit') ?? 10)
  const sort = searchParams.get('sort') ?? 'desc'

  const {
    data,
    isLoading,
  } = useQuery<Array<ShortUrl> | null>({
    queryKey: ['short-urls', page, search, limit, sort],
    queryFn: async () => {
      const response = await api('/short-urls', {
        query: {
          search,
          page: `${page}`,
          limit: `${limit}`,
          sort,
        }
      })

      if (
        response &&
        typeof response === 'object' &&
        'data' in response
      ) {
        return response.data as Array<ShortUrl>
      }

      return null
    },
  })

  return {
    data,
    isLoading,
  }
}

export default useFetchShortUrls
