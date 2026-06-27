import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import type { ShortUrl } from '@/types'
import { useDebounce } from '@uidotdev/usehooks'

function useFetchShortUrls() {
  const api = useApi()

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const search = searchParams.get('search') ?? ''
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 500)
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 10)
  const sort = searchParams.get('sort') ?? 'desc'
  const [totalPages, setTotalPages] = useState(0)

  const updateSearchParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    setSearchParams(params)
  }

  const {
    data,
    isLoading,
  } = useQuery<Array<ShortUrl> | null>({
    queryKey: ['short-urls', page, debouncedSearch, itemsPerPage, sort],
    queryFn: async () => {
      const response = await api('/short-urls', {
        query: {
          search: debouncedSearch,
          page: `${page}`,
          limit: `${itemsPerPage}`,
          sort,
        }
      })

      if (
        response &&
        typeof response === 'object'
      ) {
        if (
          'meta' in response &&
          response.meta &&
          typeof response.meta === 'object' &&
          'total_pages' in response.meta
        ) {
          setTotalPages(response.meta.total_pages as number)
        }
        if (
          'data' in response
        ) {
          return response.data as Array<ShortUrl>
        }
      }

      return null
    },
  })

  const setPage = (page: number) => {
    updateSearchParams({ page })
  }

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const setSearch = (search: string) => {
    setSearchInput(search)
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateSearchParams({
        search: debouncedSearch,
        page: 1,
      })
    }
  }, [
    debouncedSearch,
    search,
  ])

  const setItemsPerPage = (itemsPerPage: number) => {
    updateSearchParams({
      itemsPerPage,
      page: 1,
    })
  }

  const toggleSort = () => {
    updateSearchParams({
      sort: sort === 'asc' ? 'desc' : 'asc',
      page: 1,
    })
  }

  return {
    data,
    isLoading,
    sort,
    page,
    search: searchInput,
    itemsPerPage,
    totalPages,
    setPage,
    setSearch,
    toggleSort,
    setItemsPerPage,
  }
}

export default useFetchShortUrls
