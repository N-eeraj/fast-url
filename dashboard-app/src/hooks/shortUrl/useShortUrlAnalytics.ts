import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useApi from '@hooks/useApi'
import type { Option } from '@components/base/Select'
import { toast } from '@utils/toast'

const DATE_OPTIONS = [
  {
    value: 'last_hour',
    label: 'Last hour',
  },
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'yesterday',
    label: 'Yesterday',
  },
  {
    value: 'last_week',
    label: 'Last 7 days',
  },
  {
    value: 'last_month',
    label: 'Last 30 days',
  },
  {
    value: 'last_year',
    label: 'Last year',
  },
  {
    value: 'custom',
    label: 'Custom range',
  },
] as const

export type Range = typeof DATE_OPTIONS[number]['value']
interface FilterParams {
  isCustom: boolean
  range: Range
  from: string
  to: string
}

function getFilterDates({
  isCustom,
  range,
  from,
  to,
}: FilterParams) {
  const now = new Date()

  let fromDate: Date
  let toDate = now

  if (isCustom) {
    fromDate = new Date(from)
    toDate = new Date(to)
  } else {
    switch (range ?? 'last_week') {
      case 'last_hour':
        fromDate = new Date(now.getTime() - 60 * 60 * 1000)
        break

      case 'today':
        fromDate = new Date(now)
        fromDate.setHours(0, 0, 0, 0)
        break

      case 'yesterday':
        fromDate = new Date(now)
        fromDate.setDate(fromDate.getDate() - 1)
        fromDate.setHours(0, 0, 0, 0)

        toDate = new Date(fromDate)
        toDate.setHours(23, 59, 59, 999)
        break

      case 'last_month':
        fromDate = new Date(now)
        fromDate.setDate(fromDate.getDate() - 30)
        fromDate.setHours(0, 0, 0, 0)
        break

      case 'last_year':
        fromDate = new Date(now)
        fromDate.setFullYear(fromDate.getFullYear() - 1)
        fromDate.setHours(0, 0, 0, 0)
        break

      case 'last_week':
      default:
        fromDate = new Date(now)
        fromDate.setDate(fromDate.getDate() - 7)
        fromDate.setHours(0, 0, 0, 0)
        break
    }
  }

  return {
    fromDate,
    toDate,
  }
}

export default function useShortUrlAnalytics() {
  const api = useApi()
  const { shortCode } = useParams<{ shortCode: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const range = searchParams.get('range') as Range | null
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const isCustom = range === 'custom'

  const {
    data: timeline,
    isPending: isLoadingTimeline,
    error: errorFetchingTimeline,
  } = useQuery({
    queryKey: ['short-url-analytics', shortCode, range, from, to],
    enabled: !!shortCode,
    queryFn: async () => {
      const {
        fromDate,
        toDate,
      } = getFilterDates({
        isCustom,
        range: range as Range,
        from: from as string,
        to: to as string,
      })
      if (range === 'custom' && !(from && to)) return []

      const response = await api(`/short-urls/${shortCode}/analytics`, {
        query: {
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        },
      })

      if (
        response &&
        typeof response === 'object' &&
        'data' in response &&
        Array.isArray(response.data)
      ) {
        return response.data.map((datetime) => new Date(datetime))
      }

      return []
    },
  })

  useEffect(() => {
    if (!errorFetchingTimeline) return
    toast.error(errorFetchingTimeline.message)
  }, [
    errorFetchingTimeline,
  ])

  const setRange = (newRange: Range) => {
    const params = new URLSearchParams(searchParams)

    params.delete('from')
    params.delete('to')
    params.set('range', newRange)

    setSearchParams(params)
  }

  const setCustomRange = (newFrom: string, newTo: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('from', newFrom)
    params.set('to', newTo)
    setSearchParams(params)
  }

  return {
    dateOptions: DATE_OPTIONS as unknown as Option[],
    timeline,
    isLoadingTimeline,
    range: range ?? 'last_week',
    from,
    to,
    isCustom,
    setRange,
    setCustomRange,
  }
}
