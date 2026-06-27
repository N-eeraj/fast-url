import { use } from 'react'
import { Link } from 'react-router'
import Button from '@components/base/Button'
import DropDown from '@components/base/DropDown'
import { DropdownMenuItem } from '@components/ui/dropdown-menu'
import { ShortUrlContext } from '@contexts/ShortUrlCard'
import {
  EllipsisVerticalIcon,
  PenIcon,
  LineChartIcon,
  PowerIcon,
  PowerOffIcon,
} from 'lucide-react'

function ShortUrlCardAction() {
  const {
    is_active,
    short_code,
    isTogglingStatus,
    setOpenEditDialog,
    setOpenToggleStatusConfirmation,
  } = use(ShortUrlContext)

  const ActivationToggleIcon = is_active ? PowerOffIcon : PowerIcon

  return (
    <DropDown
      content={(
        <>
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              disabled={isTogglingStatus}
              className="flex w-full justify-start items-center gap-x-2 px-1.5 py-1 h-fit"
              onClick={() => setOpenEditDialog(true)}>
              <PenIcon className="size-3.5" />
              <span className="text-xs">
                Edit
              </span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              to={`/app/short-url/${short_code}`}
              className="flex items-center gap-x-2 size-full px-1.5 py-1">
              <LineChartIcon className="size-3.5" />
              <span className="text-xs">
                Analytics
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              disabled={isTogglingStatus}
              className="flex w-full justify-start items-center gap-x-2 px-1.5 py-1 h-fit"
              onClick={() => setOpenToggleStatusConfirmation(true)}>
              <ActivationToggleIcon className="size-3.5" />
              <span className="text-xs">
                {is_active ? "Deactivate" : "Activate"}
              </span>
            </Button>
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
