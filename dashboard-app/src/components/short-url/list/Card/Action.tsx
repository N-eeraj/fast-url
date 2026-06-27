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
  Trash2Icon,
} from 'lucide-react'

function ShortUrlCardAction() {
  const {
    is_active,
    short_code,
    isTogglingStatus,
    isDeleting,
    setOpenEditDialog,
    setOpenToggleStatusConfirmation,
    setOpenDeleteConfirmation,
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
              className="flex w-full justify-start items-center gap-x-2 h-fit px-1.5 py-1"
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
              className="flex w-full justify-start items-center gap-x-2 h-fit px-1.5 py-1"
              onClick={() => setOpenToggleStatusConfirmation(true)}>
              <ActivationToggleIcon className="size-3.5" />
              <span className="text-xs">
                {is_active ? "Deactivate" : "Activate"}
              </span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Button
              variant="destructive"
              disabled={isTogglingStatus}
              className="flex w-full justify-start items-center gap-x-2 h-fit px-1.5 py-1 hover:bg-destructive!"
              onClick={() => setOpenDeleteConfirmation(true)}>
              <Trash2Icon className="size-3.5" />
              <span className="text-xs">
                Delete
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
        loading={isDeleting}
        className="rounded-md text-sm">
        <EllipsisVerticalIcon />
      </Button>
    </DropDown>
  )
}

export default ShortUrlCardAction
