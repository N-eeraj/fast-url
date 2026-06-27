import { Link } from 'react-router'
import Button from '@components/base/Button'
import DropDown from '@components/base/DropDown'
import { DropdownMenuItem } from '@components/ui/dropdown-menu'
import {
  EllipsisVerticalIcon,
  PenIcon,
  LineChartIcon,
  PowerIcon,
  PowerOffIcon,
} from 'lucide-react'
import type { ShortUrl } from '@/types'

interface Props extends Pick<ShortUrl, 'is_active' | 'short_code'> {
  loading?: boolean
  onEdit: () => void
  onToggleActiveStatus: () => void
}

function ShortUrlCardAction({ is_active, short_code, loading, onEdit, onToggleActiveStatus }: Props) {
  const ActivationToggleIcon = is_active ? PowerOffIcon : PowerIcon

  return (
    <DropDown
      content={(
        <>
          <DropdownMenuItem
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={onEdit}>
            <PenIcon className="size-3.5" />
            <span className="text-xs">
              Edit
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <Link
              to={`/app/short-url/${short_code}`}
              className="flex items-center gap-x-2 size-full">
              <LineChartIcon className="size-3.5" />
              <span className="text-xs">
                Analytics
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={onToggleActiveStatus}>
            <ActivationToggleIcon className="size-3.5" />
            <span className="text-xs">
              {is_active ? "Deactivate" : "Activate"}
            </span>
          </DropdownMenuItem>
        </>
      )}
      contentProps={{
        align: "end",
      }}>
      <Button
        variant="ghost"
        size="icon-sm"
        loading={loading}
        className="rounded-md text-sm">
        <EllipsisVerticalIcon />
      </Button>
    </DropDown>
  )
}

export default ShortUrlCardAction
