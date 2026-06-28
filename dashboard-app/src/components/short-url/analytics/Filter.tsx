import { Activity, use } from 'react'
import Select from '@components/base/Select'
import Calendar from '@components/base/Calendar'
import { ShortUrlAnalyticsContext } from '@contexts/ShortUrlAnalytics'
import { type DateRange } from 'react-day-picker'

function AnalyticsFilter() {
  const {
    from,
    to,
    range,
    dateOptions,
    isCustom,
    setRange,
    setCustomRange,
  } = use(ShortUrlAnalyticsContext)

  const dateRange: DateRange | undefined =
    from && to
      ? {
          from: new Date(from),
          to: new Date(to),
        }
      : undefined

  return (
    <div className="flex justify-end items-center gap-x-2">
      <Select
        value={range}
        options={dateOptions}
        selectContentProps={{
          className: "z-101",
        }}
        onValueChange={(value) => setRange(value as any)} />

      <Activity mode={isCustom ? "visible" : "hidden"}>
        <Calendar
          mode="range"
          value={dateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          onApply={(range) => {
            setCustomRange(
              range.from!.toISOString(),
              range.to!.toISOString(),
            )
          }}
        />
      </Activity>
    </div>
  )
}

export default AnalyticsFilter
