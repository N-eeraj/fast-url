import type { ComponentProps, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'

interface Props extends ComponentProps<typeof Dialog> {
  trigger?: ReactNode
  triggerProps?: ComponentProps<typeof DialogTrigger>
  contentProps?: ComponentProps<typeof DialogContent>
  headerProps?: ComponentProps<typeof DialogHeader>
  title: string
  titleProps?: ComponentProps<typeof DialogTitle>
  description: string
  descriptionProps?: ComponentProps<typeof DialogDescription>
  children?: ReactNode
  footer?: ReactNode
  footerProps?: ComponentProps<typeof DialogFooter>
}

function BaseDialog({ 
  trigger,
  triggerProps,
  contentProps,
  headerProps,
  title,
  titleProps,
  description,
  descriptionProps,
  children,
  footer,
  footerProps,
  ...props
}: Props) {
  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger {...triggerProps}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent {...contentProps}>
        <DialogHeader {...headerProps}>
          {title && (
            <DialogTitle {...titleProps}>
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription {...descriptionProps}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter {...footerProps}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog
