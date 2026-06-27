import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination'
import { Activity } from 'react'

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPages(page: number, totalPages: number) {
  const delta = 1
  const range: (number | '...')[] = []

  const left = Math.max(2, page - delta)
  const right = Math.min(totalPages - 1, page + delta)

  range.push(1)

  if (left > 2) range.push('...')

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < totalPages - 1) range.push('...')

  if (totalPages > 1) range.push(totalPages)

  return range
}

function BasePagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages)

  return (
    <Pagination className="w-fit mx-0">
      <PaginationContent>
        <Activity mode={page === 1 ? "hidden" : "visible"}>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              className="cursor-pointer" />
          </PaginationItem>
        </Activity>

        {pages.map((p, idx) => (
          <PaginationItem key={idx}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <button
                onClick={() => onPageChange(p)}
                className={[
                  "px-3 py-1 rounded-md text-sm transition",
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground",
                ].join(" ")}>
                {p}
              </button>
            )}
          </PaginationItem>
        ))}

        <Activity mode={page === totalPages ? "hidden" : "visible"}>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => onPageChange(Math.min(page + 1, totalPages))} />
          </PaginationItem>
        </Activity>
      </PaginationContent>
    </Pagination>
  )
}

export default BasePagination