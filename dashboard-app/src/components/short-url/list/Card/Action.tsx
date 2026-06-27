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
import type { ShortUrl } from '@components/short-url/list/Card'

function ShortUrlCardAction({ is_active, short_code }: Pick<ShortUrl, 'is_active' | 'short_code'>) {
  const ActivationToggleIcon = is_active ? PowerOffIcon : PowerIcon

  return (
    <DropDown
      content={(
        <>
          <DropdownMenuItem className="flex items-center gap-x-2 cursor-pointer">
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
          <DropdownMenuItem className="flex items-center gap-x-2 cursor-pointer">
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
        className="rounded-md text-sm">
        <EllipsisVerticalIcon />
      </Button>
    </DropDown>
  )
}

export default ShortUrlCardAction
