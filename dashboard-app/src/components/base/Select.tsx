import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import type { ComponentProps } from 'react'

export type Option = string | number | {
  label: string
  value: string | number
}

interface Props extends ComponentProps<typeof Select> {
  options: Array<Option>
  placeholder?: string
  selectTriggerProps?: ComponentProps<typeof SelectTrigger>
  selectValueProps?: ComponentProps<typeof SelectValue>
  selectContentProps?: ComponentProps<typeof SelectContent>
  selectGroupProps?: ComponentProps<typeof SelectGroup>
  selectItemProps?: ComponentProps<typeof SelectItem>
}

function BaseSelect({
  value,
  options,
  placeholder,
  selectTriggerProps,
  selectValueProps,
  selectContentProps,
  selectGroupProps,
  selectItemProps,
  ...props
}: Props) {
  const getValue = (option: Option) => {
    if (typeof(option) === "string" || typeof(option) === "number") return String(option)
    return String(option.value)
  }

  const getLabel = (option: Option) => {
    if (typeof(option) === "string" || typeof(option) === "number") return option
    return option.label
  }

  return (
    <Select
      value={String(value)}
      {...props}>
      <SelectTrigger {...selectTriggerProps}>
        <SelectValue
          placeholder={placeholder}
          {...selectValueProps} />
      </SelectTrigger>
      <SelectContent {...selectContentProps}>
        <SelectGroup {...selectGroupProps}>
          {options.map((option) => (
            <SelectItem
              value={getValue(option)}
              {...selectItemProps}>
              {getLabel(option)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default BaseSelect
