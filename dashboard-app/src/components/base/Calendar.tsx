import { useState, useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@components/ui/calendar'
import Button from '@components/base/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type DateRange } from 'react-day-picker'

interface SingleProps {
  mode: 'single'
  value?: Date
  onApply: (date: Date) => void
  onCancel?: () => void
  placeholder?: string
  numberOfMonths?: number
  disabled?: (date: Date) => boolean
  className?: string
  buttonClassName?: string
}

interface RangeProps {
  mode: 'range'
  value?: DateRange
  onApply: (range: DateRange) => void
  onCancel?: () => void
  placeholder?: string
  numberOfMonths?: number
  disabled?: (date: Date) => boolean
  className?: string
  buttonClassName?: string
}


type Props = SingleProps | RangeProps

function BaseCalendar(props: Props) {
  const [open, setOpen] = useState(false)

  const [draftSingle, setDraftSingle] = useState<Date | undefined>(
    props.mode === 'single' ? props.value : undefined,
  )

  const [draftRange, setDraftRange] = useState<DateRange | undefined>(
    props.mode === 'range' ? props.value : undefined,
  )

  useEffect(() => {
    if (!open) return

    if (props.mode === 'single') {
      setDraftSingle(props.value)
    } else {
      setDraftRange(props.value)
    }
  }, [open, props])

  const label = useMemo(() => {
    if (props.mode === 'single') {
      if (!props.value) {
        return props.placeholder ?? 'Select date'
      }

      return format(props.value, 'PPP')
    }

    if (!props.value?.from) {
      return props.placeholder ?? 'Select date range'
    }

    if (!props.value.to) {
      return format(props.value.from, 'PPP')
    }

    return `${format(props.value.from, 'PPP')} - ${format(props.value.to, 'PPP')}`
  }, [props])

  const handleCancel = () => {
    if (props.mode === 'single') {
      setDraftSingle(props.value)
    } else {
      setDraftRange(props.value)
    }

    props.onCancel?.()
    setOpen(false)
  }

  const handleApply = () => {
    if (props.mode === 'single') {
      if (!draftSingle) return

      props.onApply(draftSingle)
    } else {
      if (!draftRange?.from || !draftRange.to) return

      props.onApply(draftRange)
    }

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            props.buttonClassName,
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("w-auto p-4", props.className)}
        align="start">
        {props.mode === "single" ? (
          <Calendar
            mode="single"
            selected={draftSingle}
            onSelect={setDraftSingle}
            numberOfMonths={props.numberOfMonths ?? 1}
            disabled={props.disabled} />
        ) : (
          <Calendar
            mode="range"
            selected={draftRange}
            onSelect={setDraftRange}
            defaultMonth={draftRange?.from}
            numberOfMonths={props.numberOfMonths ?? 2}
            disabled={props.disabled} />
        )}

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}>
            Cancel
          </Button>

          <Button onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BaseCalendar
