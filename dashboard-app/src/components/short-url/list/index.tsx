import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'

function ShortUrlList() {
  const api = useApi()

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const search = searchParams.get('search') ?? ''
  const limit = Number(searchParams.get('limit') ?? 10)
  const sort = searchParams.get('sort') ?? 'desc'

  const {
    data,
    isLoading,
  } = useQuery({
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
        return response.data
      }

      return null
    },
  })

  return (
    <ul>
      {isLoading ? 'Loading...' : JSON.stringify(data)}
    </ul>
  )
}

export default ShortUrlList
