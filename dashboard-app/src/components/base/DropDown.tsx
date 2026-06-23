import type { ComponentProps, ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'

interface Props extends ComponentProps<typeof DropdownMenu> {
  children: ReactNode
  content: ReactNode
  triggerProps?: ComponentProps<typeof DropdownMenuTrigger>
  contentProps?: ComponentProps<typeof DropdownMenuContent>
}

function BaseDropDown({ children, content, triggerProps, contentProps, ...props }: Props) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        asChild
        {...triggerProps}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent {...contentProps}>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BaseDropDown
